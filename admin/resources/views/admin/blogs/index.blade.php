@extends('admin.layout')
@section('title', 'Blog Posts')
@section('breadcrumb', 'Blog')

@section('actions')
    <a href="{{ route('admin.blogs.create') }}"
       class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add post
    </a>
@endsection

@section('content')
    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-stone-50 text-stone-500 text-left text-xs uppercase tracking-wider">
                    <tr>
                        <th class="px-6 py-3 font-medium">Post</th>
                        <th class="px-6 py-3 font-medium">Author</th>
                        <th class="px-6 py-3 font-medium">Published</th>
                        <th class="px-6 py-3 font-medium">Status</th>
                        <th class="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                    @forelse ($blogs as $b)
                        <tr class="hover:bg-stone-50">
                            <td class="px-6 py-3">
                                <div class="flex items-center gap-3">
                                    @if ($b->image)
                                        <img src="{{ Storage::url($b->image) }}" class="w-16 h-11 rounded-lg object-cover" alt="">
                                    @else
                                        <div class="w-16 h-11 rounded-lg bg-stone-100"></div>
                                    @endif
                                    <span class="font-medium">{{ $b->title }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-3 text-stone-600">{{ $b->author ?? '—' }}</td>
                            <td class="px-6 py-3 text-stone-600">{{ $b->published_at?->format('M d, Y') ?? '—' }}</td>
                            <td class="px-6 py-3">
                                <span class="inline-flex items-center gap-1.5 text-xs font-medium {{ $b->is_published ? 'text-green-700' : 'text-stone-400' }}">
                                    <span class="w-1.5 h-1.5 rounded-full {{ $b->is_published ? 'bg-green-500' : 'bg-stone-300' }}"></span>
                                    {{ $b->is_published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-6 py-3 text-right whitespace-nowrap">
                                <a href="{{ route('admin.blogs.edit', $b) }}" class="font-medium text-amber-600 hover:underline">Edit</a>
                                <form method="POST" action="{{ route('admin.blogs.destroy', $b) }}" class="inline" onsubmit="return confirm('Delete this post?')">
                                    @csrf @method('DELETE')
                                    <button class="text-red-600 hover:underline ml-3">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="5" class="px-6 py-12 text-center text-stone-400">No posts yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-6">{{ $blogs->links() }}</div>
@endsection
