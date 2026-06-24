@extends('admin.layout')
@section('title', 'Products')
@section('breadcrumb', 'Products')

@section('actions')
    <a href="{{ route('admin.products.create', ['type' => $type ?: 'gemstone']) }}"
       class="inline-flex items-center gap-2 bg-amber-500 text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-400">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add product
    </a>
@endsection

@section('content')
    <div class="flex flex-wrap items-center gap-2 mb-6">
        @php $pill = 'px-4 py-2 rounded-lg text-sm font-medium transition'; @endphp
        <a href="{{ route('admin.products.index') }}" class="{{ $pill }} {{ ! $type ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 hover:border-stone-300' }}">All</a>
        <a href="{{ route('admin.products.index', ['type' => 'gemstone']) }}" class="{{ $pill }} {{ $type === 'gemstone' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 hover:border-stone-300' }}">Gemstone</a>
        <a href="{{ route('admin.products.index', ['type' => 'jewelry']) }}" class="{{ $pill }} {{ $type === 'jewelry' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 hover:border-stone-300' }}">Jewelry</a>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-stone-50 text-stone-500 text-left text-xs uppercase tracking-wider">
                    <tr>
                        <th class="px-6 py-3 font-medium">Product</th>
                        <th class="px-6 py-3 font-medium">Type</th>
                        <th class="px-6 py-3 font-medium">Category</th>
                        <th class="px-6 py-3 font-medium">Price</th>
                        <th class="px-6 py-3 font-medium">Status</th>
                        <th class="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                    @forelse ($products as $p)
                        @php $img = $p->primaryImage(); @endphp
                        <tr class="hover:bg-stone-50">
                            <td class="px-6 py-3">
                                <div class="flex items-center gap-3">
                                    @if ($img)
                                        <img src="{{ Storage::url($img->path) }}" class="w-12 h-12 rounded-lg object-cover" alt="">
                                    @else
                                        <div class="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-stone-300 text-xs">IMG</div>
                                    @endif
                                    <div>
                                        <div class="font-medium">{{ $p->name }}</div>
                                        <div class="text-xs text-stone-400">{{ $p->images->count() }} image{{ $p->images->count() === 1 ? '' : 's' }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-3">
                                <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium {{ $p->type === 'gemstone' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700' }}">
                                    {{ ucfirst($p->type) }}
                                </span>
                            </td>
                            <td class="px-6 py-3 text-stone-600">{{ $p->category?->name ?? '—' }}</td>
                            <td class="px-6 py-3 font-medium">${{ number_format($p->price, 2) }}</td>
                            <td class="px-6 py-3">
                                <span class="inline-flex items-center gap-1.5 text-xs font-medium {{ $p->is_published ? 'text-green-700' : 'text-stone-400' }}">
                                    <span class="w-1.5 h-1.5 rounded-full {{ $p->is_published ? 'bg-green-500' : 'bg-stone-300' }}"></span>
                                    {{ $p->is_published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-6 py-3 text-right whitespace-nowrap">
                                <a href="{{ route('admin.products.edit', $p) }}" class="font-medium text-amber-600 hover:underline">Edit</a>
                                <form method="POST" action="{{ route('admin.products.destroy', $p) }}" class="inline" onsubmit="return confirm('Delete this product?')">
                                    @csrf @method('DELETE')
                                    <button class="text-red-600 hover:underline ml-3">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="px-6 py-12 text-center text-stone-400">No products yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-6">{{ $products->links() }}</div>
@endsection
