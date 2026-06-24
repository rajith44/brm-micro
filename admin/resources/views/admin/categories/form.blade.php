@extends('admin.layout')
@section('title', $category->exists ? 'Edit Category' : 'Add Category')
@section('breadcrumb')
    <a href="{{ route('admin.categories.index') }}" class="hover:text-amber-600">Categories</a>
@endsection

@section('content')
    <div class="max-w-2xl">
        <form method="POST"
              action="{{ $category->exists ? route('admin.categories.update', $category) : route('admin.categories.store') }}"
              enctype="multipart/form-data"
              class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
            @csrf
            @if ($category->exists) @method('PUT') @endif

            <div>
                <label class="block text-sm font-medium mb-1">Main category</label>
                <select name="type" class="w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500">
                    @foreach (\App\Models\Category::TYPES as $val => $label)
                        <option value="{{ $val }}" @selected(old('type', $category->type) === $val)>{{ $label }}</option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Name</label>
                <input type="text" name="name" value="{{ old('name', $category->name) }}" required
                       class="w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500">
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" rows="3" class="w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500">{{ old('description', $category->description) }}</textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Position</label>
                    <input type="number" name="position" value="{{ old('position', $category->position ?? 0) }}" min="0"
                           class="w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500">
                </div>
                <div class="flex items-end">
                    <label class="inline-flex items-center gap-2">
                        <input type="checkbox" name="is_active" value="1" @checked(old('is_active', $category->is_active ?? true)) class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                        <span class="text-sm">Active</span>
                    </label>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Image</label>
                @if ($category->image)
                    <img src="{{ $category->image_url }}" class="w-24 h-24 rounded-lg object-cover mb-2" alt="">
                @endif
                <input type="file" name="image" accept="image/*" class="block w-full text-sm">
            </div>

            <div class="flex items-center gap-3 pt-2">
                <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                <a href="{{ route('admin.categories.index') }}" class="text-stone-500 hover:underline text-sm">Cancel</a>
            </div>
        </form>
    </div>
@endsection
