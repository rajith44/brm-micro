<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Slider;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CatalogController extends Controller
{
    /**
     * Active categories (optionally filtered by type) with published product counts.
     */
    public function categories(Request $request)
    {
        $type = $request->query('type');

        $categories = Category::query()
            ->where('is_active', true)
            ->when(in_array($type, ['gemstone', 'jewelry']), fn ($q) => $q->where('type', $type))
            ->withCount(['products' => fn ($q) => $q->where('is_published', true)])
            ->orderBy('type')->orderBy('position')->orderBy('name')
            ->get()
            ->map(fn ($c) => [
                'name' => $c->name,
                'slug' => $c->slug,
                'type' => $c->type,
                'image' => $this->mediaUrl($c->image),
                'count' => $c->products_count,
            ]);

        return response()->json($categories);
    }

    /**
     * Published products, filterable by type, category slug, featured, limit.
     */
    public function products(Request $request)
    {
        $products = Product::query()
            ->with(['category', 'images'])
            ->where('is_published', true)
            ->when(in_array($request->query('type'), ['gemstone', 'jewelry']), fn ($q) => $q->where('type', $request->query('type')))
            ->when($request->query('category'), function ($q, $slug) {
                $q->whereHas('category', fn ($c) => $c->where('slug', $slug));
            })
            ->when($request->boolean('featured'), fn ($q) => $q->where('is_featured', true))
            ->latest()
            ->when($request->query('limit'), fn ($q, $limit) => $q->limit((int) $limit))
            ->get()
            ->map(fn ($p) => $this->productCard($p));

        return response()->json($products);
    }

    /**
     * Single product by slug with all images, attributes and grouped detail.
     */
    public function product(string $slug)
    {
        $product = Product::with(['category', 'images'])
            ->where('is_published', true)
            ->where('slug', $slug)
            ->first();

        if (! $product) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json([
            'id' => $product->slug,
            'name' => $product->name,
            'slug' => $product->slug,
            'sku' => $product->sku,
            'price' => $this->priceHidden() ? null : (float) $product->price,
            'type' => $product->type,
            'detail' => $product->short_detail,
            'description' => $product->description,
            'category' => $product->category ? [
                'name' => $product->category->name,
                'slug' => $product->category->slug,
            ] : null,
            'images' => $product->images->map(fn ($i) => $this->mediaUrl($i->path))->values(),
            'image' => $this->mediaUrl(optional($product->primaryImage())->path),
            'attributeGroups' => $this->attributeGroups($product),
        ]);
    }

    /**
     * Public site settings consumed by the storefront.
     */
    public function settings()
    {
        $s = Setting::map();
        $v = fn ($k) => $s[$k] ?? null;

        return response()->json([
            'hidePrice' => ($s['hide_price'] ?? '0') === '1',
            'business' => [
                'name' => $v('business_name'),
                'address' => $v('business_address'),
                'hours' => $v('business_hours'),
                'tel' => $v('business_tel'),
                'mobile' => $v('business_mobile'),
                'whatsapp' => $v('business_whatsapp'),
                'email' => $v('business_email'),
            ],
            'social' => array_filter([
                'facebook' => $v('social_facebook'),
                'instagram' => $v('social_instagram'),
                'twitter' => $v('social_twitter'),
                'youtube' => $v('social_youtube'),
                'tiktok' => $v('social_tiktok'),
                'linkedin' => $v('social_linkedin'),
                'pinterest' => $v('social_pinterest'),
            ]),
            'seo' => [
                'title' => $v('seo_title'),
                'description' => $v('seo_description'),
                'keywords' => $v('seo_keywords'),
            ],
        ]);
    }

    private function priceHidden(): bool
    {
        return (Setting::get('hide_price', '0')) === '1';
    }

    /**
     * Active homepage hero slides.
     */
    public function sliders()
    {
        $slides = Slider::where('is_active', true)
            ->orderBy('position')->orderBy('id')
            ->get()
            ->map(fn ($s) => [
                'badge' => $s->badge,
                'title' => $s->title,
                'text' => $s->text,
                'image' => $this->mediaUrl($s->image),
                'primary' => ['label' => $s->primary_label, 'href' => $s->primary_link ?: '#'],
                'secondary' => ['label' => $s->secondary_label, 'href' => $s->secondary_link ?: '#'],
            ]);

        return response()->json($slides);
    }

    /**
     * Active homepage testimonials.
     */
    public function testimonials()
    {
        $items = Testimonial::where('is_active', true)
            ->orderBy('position')->orderBy('id')
            ->get()
            ->map(fn ($t) => [
                'text' => $t->quote,
                'author' => $t->author,
                'location' => $t->location,
                'rating' => $t->rating,
            ]);

        return response()->json($items);
    }

    /**
     * Published blog posts, newest first.
     */
    public function blogs(Request $request)
    {
        $blogs = Blog::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->when($request->query('limit'), fn ($q, $limit) => $q->limit((int) $limit))
            ->get()
            ->map(fn ($b) => $this->blogCard($b));

        return response()->json($blogs);
    }

    /**
     * Single published blog post by slug.
     */
    public function blog(string $slug)
    {
        $blog = Blog::where('is_published', true)->where('slug', $slug)->first();

        if (! $blog) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($this->blogCard($blog) + [
            'body' => $blog->body,
        ]);
    }

    private function blogCard(Blog $b): array
    {
        return [
            'slug' => $b->slug,
            'title' => $b->title,
            'author' => $b->author,
            'excerpt' => $b->excerpt,
            'image' => $this->mediaUrl($b->image),
            'date' => optional($b->published_at)->format('M d, Y'),
        ];
    }

    private function productCard(Product $p): array
    {
        return [
            'id' => $p->slug,
            'name' => $p->name,
            'slug' => $p->slug,
            'price' => $this->priceHidden() ? null : (float) $p->price,
            'detail' => $p->short_detail,
            'type' => $p->type,
            'category' => $p->category?->name,
            'categorySlug' => $p->category?->slug,
            'image' => $this->mediaUrl(optional($p->primaryImage())->path),
        ];
    }

    /**
     * Build the grouped, human-readable attribute sections for a product,
     * using the schema and only including fields that have values.
     */
    private function attributeGroups(Product $product): array
    {
        $schema = Product::attributeSchema();
        $values = $product->attributes ?? [];
        $slug = $product->category?->slug;

        // Which variants apply to this product.
        $variants = ['common'];
        if ($product->type === 'jewelry' && in_array($slug, ['rings', 'pendants'])) {
            $variants[] = $slug;
        }

        $out = [];
        foreach (($schema[$product->type] ?? []) as $variantKey => $groups) {
            if (! in_array($variantKey, $variants)) {
                continue;
            }
            foreach ($groups as $group) {
                $fields = [];
                foreach ($group['fields'] as $key => $label) {
                    if (! empty($values[$key])) {
                        $fields[] = ['label' => $label, 'value' => $values[$key]];
                    }
                }
                if ($fields) {
                    $out[] = ['title' => $group['title'], 'fields' => $fields];
                }
            }
        }

        return $out;
    }

    private function mediaUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }
        if (Str::startsWith($path, '/')) {
            return url($path);
        }

        return url(Storage::url($path));
    }
}
