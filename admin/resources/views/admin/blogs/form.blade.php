@extends('admin.layout')
@section('title', $blog->exists ? 'Edit Post' : 'Add Post')
@section('breadcrumb')
    <a href="{{ route('admin.blogs.index') }}" class="hover:text-amber-600">Blog</a>
@endsection

@php $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500'; @endphp

@section('content')
    <div class="max-w-3xl">
        <form method="POST"
              action="{{ $blog->exists ? route('admin.blogs.update', $blog) : route('admin.blogs.store') }}"
              enctype="multipart/form-data" class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
            @csrf
            @if ($blog->exists) @method('PUT') @endif

            <div>
                <label class="block text-sm font-medium mb-1">Title</label>
                <input type="text" name="title" value="{{ old('title', $blog->title) }}" required class="{{ $field }}">
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Author</label>
                    <input type="text" name="author" value="{{ old('author', $blog->author) }}" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Publish date</label>
                    <input type="date" name="published_at" value="{{ old('published_at', optional($blog->published_at)->format('Y-m-d')) }}" class="{{ $field }}">
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Excerpt</label>
                <textarea name="excerpt" rows="2" class="{{ $field }}">{{ old('excerpt', $blog->excerpt) }}</textarea>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Body</label>
                <textarea name="body" rows="10" class="{{ $field }}">{{ old('body', $blog->body) }}</textarea>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Featured image</label>
                @if ($blog->image)
                    <img src="{{ Storage::url($blog->image) }}" class="w-40 h-24 rounded object-cover mb-2" alt="">
                @endif
                <input type="file" name="image" accept="image/*" class="block w-full text-sm">
            </div>

            <label class="inline-flex items-center gap-2">
                <input type="checkbox" name="is_published" value="1" @checked(old('is_published', $blog->is_published ?? true)) class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                <span class="text-sm">Published</span>
            </label>

            <div class="flex items-center gap-3 pt-2">
                <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                <a href="{{ route('admin.blogs.index') }}" class="text-stone-500 hover:underline text-sm">Cancel</a>
            </div>
        </form>
    </div>
@endsection
