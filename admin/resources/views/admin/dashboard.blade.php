@extends('admin.layout')
@section('title', 'Dashboard')

@section('actions')
    <a href="{{ route('admin.products.create', ['type' => 'gemstone']) }}"
       class="hidden sm:inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-800">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add product
    </a>
@endsection

@section('content')
    @php
        $cards = [
            ['label' => 'Gemstones', 'value' => $stats['gemstones'], 'route' => 'admin.products.index', 'params' => ['type' => 'gemstone'], 'ring' => 'from-sky-400 to-blue-600'],
            ['label' => 'Jewelry', 'value' => $stats['jewelry'], 'route' => 'admin.products.index', 'params' => ['type' => 'jewelry'], 'ring' => 'from-amber-300 to-amber-600'],
            ['label' => 'Categories', 'value' => $stats['categories'], 'route' => 'admin.categories.index', 'params' => [], 'ring' => 'from-emerald-400 to-emerald-600'],
            ['label' => 'Blog Posts', 'value' => $stats['blogs'], 'route' => 'admin.blogs.index', 'params' => [], 'ring' => 'from-rose-400 to-rose-600'],
        ];
    @endphp

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        @foreach ($cards as $c)
            <a href="{{ route($c['route'], $c['params']) }}"
               class="group bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition">
                <div class="flex items-center justify-between">
                    <span class="w-10 h-10 rounded-xl bg-gradient-to-br {{ $c['ring'] }} opacity-90"></span>
                    <svg class="w-5 h-5 text-stone-300 group-hover:text-amber-500 transition" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </div>
                <div class="mt-4 text-3xl font-semibold">{{ $c['value'] }}</div>
                <div class="text-sm text-stone-500">{{ $c['label'] }}</div>
            </a>
        @endforeach
    </div>

    <div class="flex flex-wrap items-center gap-3 mb-8">
        <a href="{{ route('admin.products.create', ['type' => 'gemstone']) }}" class="bg-stone-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">+ Add Gemstone</a>
        <a href="{{ route('admin.products.create', ['type' => 'jewelry']) }}" class="bg-amber-500 text-stone-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-400">+ Add Jewelry</a>
        <a href="{{ route('admin.categories.create') }}" class="bg-white border border-stone-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-amber-400">+ Category</a>
        <a href="{{ route('admin.blogs.create') }}" class="bg-white border border-stone-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-amber-400">+ Blog Post</a>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
            <h2 class="font-semibold">Recent products</h2>
            <a href="{{ route('admin.products.index') }}" class="text-sm text-amber-600 hover:underline">View all</a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-stone-50 text-stone-500 text-left text-xs uppercase tracking-wider">
                    <tr>
                        <th class="px-6 py-3 font-medium">Product</th>
                        <th class="px-6 py-3 font-medium">Type</th>
                        <th class="px-6 py-3 font-medium">Category</th>
                        <th class="px-6 py-3 font-medium">Price</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                    @forelse ($recentProducts as $p)
                        @php $img = $p->primaryImage(); @endphp
                        <tr class="hover:bg-stone-50">
                            <td class="px-6 py-3">
                                <div class="flex items-center gap-3">
                                    @if ($img)
                                        <img src="{{ $img->url }}" class="w-10 h-10 rounded-lg object-cover" alt="">
                                    @else
                                        <div class="w-10 h-10 rounded-lg bg-stone-100"></div>
                                    @endif
                                    <a href="{{ route('admin.products.edit', $p) }}" class="font-medium hover:text-amber-600">{{ $p->name }}</a>
                                </div>
                            </td>
                            <td class="px-6 py-3"><span class="capitalize text-stone-600">{{ $p->type }}</span></td>
                            <td class="px-6 py-3 text-stone-600">{{ $p->category?->name ?? '—' }}</td>
                            <td class="px-6 py-3 font-medium">${{ number_format($p->price, 2) }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="4" class="px-6 py-12 text-center text-stone-400">No products yet — add your first one above.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
