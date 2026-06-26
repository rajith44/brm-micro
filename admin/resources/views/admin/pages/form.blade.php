@extends('admin.layout')
@section('title', 'Edit: ' . $page->title)
@section('breadcrumb')
    <a href="{{ route('admin.pages.index') }}" class="hover:text-amber-600">Pages</a>
@endsection

@php $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500'; @endphp

@section('content')
    <div class="max-w-3xl">
        <form method="POST" action="{{ route('admin.pages.update', $page) }}" enctype="multipart/form-data"
              class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
            @csrf @method('PUT')

            <div>
                <label class="block text-sm font-medium mb-1">Title</label>
                <input type="text" name="title" value="{{ old('title', $page->title) }}" required class="{{ $field }}">
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Subtitle</label>
                <input type="text" name="subtitle" value="{{ old('subtitle', $page->subtitle) }}" class="{{ $field }}">
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Content</label>
                <textarea name="content" rows="14" class="{{ $field }}">{{ old('content', $page->content) }}</textarea>
                <p class="text-xs text-stone-500 mt-1">Plain text or HTML.</p>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Banner image</label>
                @if ($page->image)
                    <img src="{{ $page->image_url }}" class="w-40 h-24 rounded object-cover mb-2" alt="">
                @endif
                <input type="file" name="image" accept="image/*" class="block w-full text-sm">
            </div>

            <div class="flex items-center gap-3 pt-2">
                <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                <a href="{{ route('admin.pages.index') }}" class="text-stone-500 hover:underline text-sm">Cancel</a>
            </div>
        </form>
    </div>
@endsection
