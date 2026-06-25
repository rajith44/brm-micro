@extends('admin.layout')
@section('title', $testimonial->exists ? 'Edit Testimonial' : 'Add Testimonial')
@section('breadcrumb')
    <a href="{{ route('admin.testimonials.index') }}" class="hover:text-amber-600">Testimonials</a>
@endsection

@php $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500'; @endphp

@section('content')
    <div class="max-w-2xl">
        <form method="POST"
              action="{{ $testimonial->exists ? route('admin.testimonials.update', $testimonial) : route('admin.testimonials.store') }}"
              class="bg-white rounded-2xl border border-stone-200 p-6 space-y-5">
            @csrf
            @if ($testimonial->exists) @method('PUT') @endif

            <div>
                <label class="block text-sm font-medium mb-1">Quote</label>
                <textarea name="quote" rows="4" required class="{{ $field }}">{{ old('quote', $testimonial->quote) }}</textarea>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Author</label>
                    <input type="text" name="author" value="{{ old('author', $testimonial->author) }}" required class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Location</label>
                    <input type="text" name="location" value="{{ old('location', $testimonial->location) }}" placeholder="London, UK" class="{{ $field }}">
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Rating</label>
                    <select name="rating" class="{{ $field }}">
                        @for ($i = 5; $i >= 1; $i--)
                            <option value="{{ $i }}" @selected(old('rating', $testimonial->rating ?? 5) == $i)>{{ $i }} star{{ $i === 1 ? '' : 's' }}</option>
                        @endfor
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Order</label>
                    <input type="number" name="position" min="0" value="{{ old('position', $testimonial->position ?? 0) }}" class="{{ $field }}">
                </div>
            </div>
            <label class="inline-flex items-center gap-2">
                <input type="checkbox" name="is_active" value="1" @checked(old('is_active', $testimonial->is_active ?? true)) class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                <span class="text-sm">Active</span>
            </label>

            <div class="flex items-center gap-3 pt-2">
                <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                <a href="{{ route('admin.testimonials.index') }}" class="text-stone-500 hover:underline text-sm">Cancel</a>
            </div>
        </form>
    </div>
@endsection
