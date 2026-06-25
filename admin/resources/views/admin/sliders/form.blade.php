@extends('admin.layout')
@section('title', $slider->exists ? 'Edit Slide' : 'Add Slide')
@section('breadcrumb')
    <a href="{{ route('admin.sliders.index') }}" class="hover:text-amber-600">Sliders</a>
@endsection

@php $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500'; @endphp

@section('content')
    <div class="max-w-3xl">
        <form method="POST"
              action="{{ $slider->exists ? route('admin.sliders.update', $slider) : route('admin.sliders.store') }}"
              enctype="multipart/form-data" class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
            @csrf
            @if ($slider->exists) @method('PUT') @endif

            <div>
                <label class="block text-sm font-medium mb-1">Badge</label>
                <input type="text" name="badge" value="{{ old('badge', $slider->badge) }}" placeholder="e.g. Ceylon Luxury Collection" class="{{ $field }}">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Title</label>
                <input type="text" name="title" value="{{ old('title', $slider->title) }}" required class="{{ $field }}">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Text</label>
                <textarea name="text" rows="3" class="{{ $field }}">{{ old('text', $slider->text) }}</textarea>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Primary button label</label>
                    <input type="text" name="primary_label" value="{{ old('primary_label', $slider->primary_label) }}" placeholder="Explore Collection" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Primary button link</label>
                    <input type="text" name="primary_link" value="{{ old('primary_link', $slider->primary_link) }}" placeholder="/gemstones" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Secondary button label</label>
                    <input type="text" name="secondary_label" value="{{ old('secondary_label', $slider->secondary_label) }}" placeholder="Book Consultation" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Secondary button link</label>
                    <input type="text" name="secondary_link" value="{{ old('secondary_link', $slider->secondary_link) }}" placeholder="/contact" class="{{ $field }}">
                </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Order</label>
                    <input type="number" name="position" min="0" value="{{ old('position', $slider->position ?? 0) }}" class="{{ $field }}">
                </div>
                <div class="flex items-end">
                    <label class="inline-flex items-center gap-2">
                        <input type="checkbox" name="is_active" value="1" @checked(old('is_active', $slider->is_active ?? true)) class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                        <span class="text-sm">Active</span>
                    </label>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Background image (wide, ~1800×1100)</label>
                @if ($slider->image)
                    <img src="{{ Storage::url($slider->image) }}" class="w-full max-w-md h-32 object-cover rounded-lg mb-2" alt="">
                @endif
                <input type="file" name="image" accept="image/*" class="block w-full text-sm">
            </div>

            <div class="flex items-center gap-3 pt-2">
                <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                <a href="{{ route('admin.sliders.index') }}" class="text-stone-500 hover:underline text-sm">Cancel</a>
            </div>
        </form>
    </div>
@endsection
