<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');
        $products = Product::query()
            ->with(['category', 'images'])
            ->when(in_array($type, ['gemstone', 'jewelry']), fn ($q) => $q->where('type', $type))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return view('admin.products.index', compact('products', 'type'));
    }

    public function create(Request $request)
    {
        $type = in_array($request->query('type'), ['gemstone', 'jewelry']) ? $request->query('type') : 'gemstone';

        return view('admin.products.form', [
            'product' => new Product(['type' => $type, 'is_published' => true]),
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $this->ensureImageLimit($request, 0);
        $data['slug'] = $this->uniqueSlug($data['name']);
        $data['is_published'] = $request->boolean('is_published');
        $data['is_featured'] = $request->boolean('is_featured');

        $product = Product::create($data);

        $this->syncNewImages($request, $product);

        return redirect()->route('admin.products.index')->with('status', 'Product created.');
    }

    public function edit(Product $product)
    {
        $product->load('images');

        return view('admin.products.form', [
            'product' => $product,
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validateData($request, $product->id);
        if ($data['name'] !== $product->name) {
            $data['slug'] = $this->uniqueSlug($data['name'], $product->id);
        }
        $data['is_published'] = $request->boolean('is_published');
        $data['is_featured'] = $request->boolean('is_featured');

        $keepCount = $product->images()->count() - count((array) $request->input('delete_images', []));
        $this->ensureImageLimit($request, max($keepCount, 0));

        $product->update($data);

        // Delete selected existing images
        foreach ((array) $request->input('delete_images', []) as $imageId) {
            $img = $product->images()->find($imageId);
            if ($img) {
                Storage::disk('public')->delete($img->path);
                $img->delete();
            }
        }

        $this->syncNewImages($request, $product);

        // Set primary image
        if ($request->filled('primary_image')) {
            $product->images()->update(['is_primary' => false]);
            $product->images()->where('id', $request->input('primary_image'))->update(['is_primary' => true]);
        }
        // Ensure at least one primary exists
        if ($product->images()->where('is_primary', true)->doesntExist() && $product->images()->exists()) {
            $product->images()->orderBy('position')->first()->update(['is_primary' => true]);
        }

        return redirect()->route('admin.products.index')->with('status', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $img) {
            Storage::disk('public')->delete($img->path);
        }
        $product->delete();

        return redirect()->route('admin.products.index')->with('status', 'Product deleted.');
    }

    /**
     * Reject the request if keeping + newly uploaded images exceeds the cap.
     */
    private function ensureImageLimit(Request $request, int $keepCount): void
    {
        $new = $request->hasFile('images') ? count($request->file('images')) : 0;
        if ($keepCount + $new > Product::MAX_IMAGES) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'images' => 'A product can have at most '.Product::MAX_IMAGES.' images. You currently have '
                    .$keepCount.' and tried to add '.$new.'.',
            ]);
        }
    }

    /**
     * Upload newly added images, enforcing the 5-image total cap.
     */
    private function syncNewImages(Request $request, Product $product): void
    {
        if (! $request->hasFile('images')) {
            return;
        }

        $existing = $product->images()->count();
        $remaining = max(0, Product::MAX_IMAGES - $existing);
        $files = array_slice($request->file('images'), 0, $remaining);
        $position = $existing;

        foreach ($files as $file) {
            $path = $file->store('products', 'public');
            $product->images()->create([
                'path' => $path,
                'position' => $position,
                'is_primary' => $existing === 0 && $position === 0,
            ]);
            $position++;
        }
    }

    private function validateData(Request $request, ?int $ignoreId = null): array
    {
        $data = $request->validate([
            'type' => ['required', Rule::in(['gemstone', 'jewelry'])],
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['nullable', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:0'],
            'short_detail' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            // Type/subcategory-specific attributes (see Product::attributeSchema()).
            'attributes' => ['nullable', 'array'],
            'attributes.*' => ['nullable', 'string', 'max:255'],

            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:4096'],
            'delete_images' => ['nullable', 'array'],
            'primary_image' => ['nullable', 'integer'],
        ]);

        // Drop blank attribute values so stored JSON stays tidy.
        $data['attributes'] = array_filter(
            $data['attributes'] ?? [],
            fn ($v) => $v !== null && $v !== ''
        );

        return $data;
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 1;
        while (Product::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}
