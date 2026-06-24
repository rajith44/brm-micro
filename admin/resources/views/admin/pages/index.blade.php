@extends('admin.layout')
@section('title', 'Static Pages')
@section('breadcrumb', 'Pages')

@section('content')
    <p class="text-sm text-stone-500 mb-6">Edit the content of your fixed marketing pages. These cannot be added or removed.</p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        @forelse ($pages as $page)
            <div class="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col">
                <div class="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 mb-4">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                </div>
                <h3 class="font-semibold text-lg">{{ $page->title }}</h3>
                <p class="text-sm text-stone-500 mt-1 flex-1">{{ $page->subtitle ?: 'No subtitle' }}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-xs text-stone-400 font-mono">/{{ $page->key }}</span>
                    <a href="{{ route('admin.pages.edit', $page) }}" class="text-sm font-medium text-amber-600 hover:underline">Edit →</a>
                </div>
            </div>
        @empty
            <p class="text-stone-400">Run the seeder to create pages.</p>
        @endforelse
    </div>
@endsection
