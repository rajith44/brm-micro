@extends('admin.layout')
@section('title', 'Testimonials')
@section('breadcrumb', 'Testimonials')

@section('actions')
    <a href="{{ route('admin.testimonials.create') }}"
       class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add testimonial
    </a>
@endsection

@section('content')
    <p class="text-sm text-stone-500 mb-6">Customer reviews shown in the homepage testimonials carousel.</p>
    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-stone-50 text-stone-500 text-left text-xs uppercase tracking-wider">
                <tr>
                    <th class="px-6 py-3 font-medium">Quote</th>
                    <th class="px-6 py-3 font-medium">Author</th>
                    <th class="px-6 py-3 font-medium">Rating</th>
                    <th class="px-6 py-3 font-medium">Status</th>
                    <th class="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
                @forelse ($testimonials as $t)
                    <tr class="hover:bg-stone-50">
                        <td class="px-6 py-3 max-w-md"><span class="line-clamp-2 text-stone-600">{{ $t->quote }}</span></td>
                        <td class="px-6 py-3">
                            <div class="font-medium">{{ $t->author }}</div>
                            <div class="text-xs text-stone-400">{{ $t->location }}</div>
                        </td>
                        <td class="px-6 py-3 text-amber-500">{{ str_repeat('★', $t->rating) }}</td>
                        <td class="px-6 py-3">
                            <span class="inline-flex items-center gap-1.5 text-xs font-medium {{ $t->is_active ? 'text-green-700' : 'text-stone-400' }}">
                                <span class="w-1.5 h-1.5 rounded-full {{ $t->is_active ? 'bg-green-500' : 'bg-stone-300' }}"></span>
                                {{ $t->is_active ? 'Active' : 'Hidden' }}
                            </span>
                        </td>
                        <td class="px-6 py-3 text-right whitespace-nowrap">
                            <a href="{{ route('admin.testimonials.edit', $t) }}" class="font-medium text-amber-600 hover:underline">Edit</a>
                            <form method="POST" action="{{ route('admin.testimonials.destroy', $t) }}" class="inline" onsubmit="return confirm('Delete this testimonial?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600 hover:underline ml-3">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="px-6 py-12 text-center text-stone-400">No testimonials yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
