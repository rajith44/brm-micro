@extends('admin.layout')
@section('title', 'Hero Sliders')
@section('breadcrumb', 'Sliders')

@section('actions')
    <a href="{{ route('admin.sliders.create') }}"
       class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add slide
    </a>
@endsection

@section('content')
    <p class="text-sm text-stone-500 mb-6">Slides shown in the homepage hero carousel, in order.</p>
    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-stone-50 text-stone-500 text-left text-xs uppercase tracking-wider">
                <tr>
                    <th class="px-6 py-3 font-medium">Slide</th>
                    <th class="px-6 py-3 font-medium">Badge</th>
                    <th class="px-6 py-3 font-medium">Order</th>
                    <th class="px-6 py-3 font-medium">Status</th>
                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
                @forelse ($sliders as $s)
                    <tr class="hover:bg-stone-50">
                        <td class="px-6 py-3">
                            <div class="flex items-center gap-3">
                                @if ($s->image)
                                    <img src="{{ Storage::url($s->image) }}" class="w-20 h-12 rounded-lg object-cover" alt="">
                                @else
                                    <div class="w-20 h-12 rounded-lg bg-stone-100"></div>
                                @endif
                                <span class="font-medium">{{ $s->title }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-3 text-stone-600">{{ $s->badge ?? '—' }}</td>
                        <td class="px-6 py-3 text-stone-600">{{ $s->position }}</td>
                        <td class="px-6 py-3">
                            <span class="inline-flex items-center gap-1.5 text-xs font-medium {{ $s->is_active ? 'text-green-700' : 'text-stone-400' }}">
                                <span class="w-1.5 h-1.5 rounded-full {{ $s->is_active ? 'bg-green-500' : 'bg-stone-300' }}"></span>
                                {{ $s->is_active ? 'Active' : 'Hidden' }}
                            </span>
                        </td>
                        <td class="px-6 py-3 text-right whitespace-nowrap">
                            <a href="{{ route('admin.sliders.edit', $s) }}" class="font-medium text-amber-600 hover:underline">Edit</a>
                            <form method="POST" action="{{ route('admin.sliders.destroy', $s) }}" class="inline" onsubmit="return confirm('Delete this slide?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600 hover:underline ml-3">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="px-6 py-12 text-center text-stone-400">No slides yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
