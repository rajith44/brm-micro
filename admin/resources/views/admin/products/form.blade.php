@extends('admin.layout')
@section('title', $product->exists ? 'Edit Product' : 'Add Product')
@section('breadcrumb')
    <a href="{{ route('admin.products.index') }}" class="hover:text-amber-600">Products</a>
@endsection

@php
    $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500';
    $existingCount = $product->exists ? $product->images->count() : 0;
    $remaining = \App\Models\Product::MAX_IMAGES - $existingCount;
@endphp

@section('content')
    <div x-data="{ type: '{{ old('type', $product->type) }}', categorySlug: '{{ old('category_slug', $product->category?->slug) }}' }"
        class="max-w-4xl">
        <form method="POST"
            action="{{ $product->exists ? route('admin.products.update', $product) : route('admin.products.store') }}"
            enctype="multipart/form-data" class="space-y-6">
            @csrf
            @if ($product->exists) @method('PUT') @endif

            {{-- Basics --}}
            <div class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
                <h2 class="font-semibold text-lg">Basic details</h2>

                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Main category</label>
                        <select name="type" x-model="type" x-ref="type" @change="$refs.category.value=''; categorySlug=''"
                            class="{{ $field }}">
                            @foreach (\App\Models\Product::TYPES as $val => $label)
                                <option value="{{ $val }}">{{ $label }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Subcategory</label>
                        <select name="category_id" x-ref="category"
                            @change="categorySlug = $event.target.selectedOptions[0]?.dataset.slug || ''"
                            class="{{ $field }}">
                            <option value="" data-slug="">— None —</option>
                            @foreach ($categories as $c)
                                <option value="{{ $c->id }}" data-slug="{{ $c->slug }}" x-show="type === '{{ $c->type }}'"
                                    :disabled="type !== '{{ $c->type }}'" @selected(old('category_id', $product->category_id) == $c->id)>{{ $c->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Name</label>
                        <input type="text" name="name" value="{{ old('name', $product->name) }}" required
                            class="{{ $field }}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">SKU/Item Code</label>
                        <input type="text" name="sku" value="{{ old('sku', $product->sku) }}" class="{{ $field }}">
                    </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Price (USD)</label>
                        <input type="number" step="0.01" min="0" name="price" value="{{ old('price', $product->price) }}"
                            required class="{{ $field }}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Short detail</label>
                        <input type="text" name="short_detail" value="{{ old('short_detail', $product->short_detail) }}"
                            placeholder="e.g. Unheated / Cushion" class="{{ $field }}">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" rows="5"
                        class="{{ $field }}">{{ old('description', $product->description) }}</textarea>
                </div>

                <div class="flex flex-wrap gap-6">
                    <label class="inline-flex items-center gap-2">
                        <input type="checkbox" name="is_published" value="1" @checked(old('is_published', $product->is_published ?? true))
                            class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                        <span class="text-sm">Published</span>
                    </label>
                    <label class="inline-flex items-center gap-2">
                        <input type="checkbox" name="is_featured" value="1" @checked(old('is_featured', $product->is_featured ?? false))
                            class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                        <span class="text-sm">Featured</span>
                    </label>
                </div>
            </div>

            {{-- Dynamic, type/subcategory-specific attributes --}}
            @php
                $schema = \App\Models\Product::attributeSchema();
                $attrVal = fn($key) => old("attributes.$key", data_get($product->attributes, $key, ''));
                // Alpine "active" condition per type+variant. Disabled fieldsets are
                // excluded from submission, so only the visible variant is saved.
                $conditions = [
                    'gemstone:common' => "type === 'gemstone'",
                    'jewelry:common' => "type === 'jewelry'",
                    'jewelry:rings' => "type === 'jewelry' && categorySlug === 'rings'",
                    'jewelry:pendants' => "type === 'jewelry' && categorySlug === 'pendants'",
                ];
            @endphp

            @foreach ($schema as $stype => $variants)
                @foreach ($variants as $variantKey => $groups)
                    @php $cond = $conditions["$stype:$variantKey"]; @endphp
                    <fieldset x-show="{{ $cond }}" :disabled="!({{ $cond }})" x-cloak class="space-y-6 disabled:opacity-100">
                        @foreach ($groups as $group)
                            <div class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
                                <h2 class="font-semibold text-lg">{{ $group['title'] }}</h2>
                                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    @foreach ($group['fields'] as $key => $label)
                                        <div>
                                            <label class="block text-sm font-medium mb-1">{{ $label }}</label>
                                            <input type="text" name="attributes[{{ $key }}]" value="{{ $attrVal($key) }}"
                                                class="{{ $field }}">
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </fieldset>
                @endforeach
            @endforeach

            {{-- Images --}}
            <div class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
                <div class="flex items-center justify-between">
                    <h2 class="font-semibold text-lg">Images</h2>
                    <span class="text-xs text-stone-500">Max {{ \App\Models\Product::MAX_IMAGES }} images</span>
                </div>

                @if ($product->exists && $product->images->count())
                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        @foreach ($product->images as $img)
                            <div class="border border-stone-200 rounded-lg p-2">
                                <img src="{{ Storage::url($img->path) }}" class="w-full h-24 object-cover rounded mb-2" alt="">
                                <label class="flex items-center gap-1 text-xs mb-1">
                                    <input type="radio" name="primary_image" value="{{ $img->id }}" @checked($img->is_primary)
                                        class="text-amber-500 focus:ring-amber-500">
                                    Primary
                                </label>
                                <label class="flex items-center gap-1 text-xs text-red-600">
                                    <input type="checkbox" name="delete_images[]" value="{{ $img->id }}"
                                        class="rounded text-red-500 focus:ring-red-500">
                                    Delete
                                </label>
                            </div>
                        @endforeach
                    </div>
                @endif

                <div>
                    <label class="block text-sm font-medium mb-1">
                        {{ $product->exists ? "Add images ($remaining slot" . ($remaining === 1 ? '' : 's') . ' left)' : 'Upload images' }}
                    </label>
                    <input type="file" name="images[]" accept="image/*" multiple class="block w-full text-sm"
                        onchange="if (this.files.length > {{ max($remaining, 0) }}) { alert('You can upload at most {{ max($remaining, 0) }} more image(s).'); this.value=''; }">
                    <p class="text-xs text-stone-500 mt-1">JPG / PNG / WebP up to 4MB each.</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save
                    Product</button>
                <a href="{{ route('admin.products.index') }}" class="text-stone-500 hover:underline text-sm">Cancel</a>
            </div>
        </form>
    </div>
@endsection