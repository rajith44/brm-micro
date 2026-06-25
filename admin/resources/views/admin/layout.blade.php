<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>@yield('title', 'Dashboard') · Micro Art LTD Admin</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>[x-cloak]{display:none !important;}</style>
</head>
<body class="h-full bg-stone-100 text-stone-800 antialiased">
@php
    $nav = [
        ['heading' => 'Overview', 'items' => [
            ['route' => 'admin.dashboard', 'label' => 'Dashboard', 'pattern' => null, 'icon' => 'grid'],
        ]],
        ['heading' => 'Catalog', 'items' => [
            ['route' => 'admin.products.index', 'label' => 'Products', 'pattern' => 'admin.products.*', 'icon' => 'gem'],
            ['route' => 'admin.categories.index', 'label' => 'Categories', 'pattern' => 'admin.categories.*', 'icon' => 'tag'],
        ]],
        ['heading' => 'Home Page', 'items' => [
            ['route' => 'admin.sliders.index', 'label' => 'Hero Sliders', 'pattern' => 'admin.sliders.*', 'icon' => 'image'],
            ['route' => 'admin.testimonials.index', 'label' => 'Testimonials', 'pattern' => 'admin.testimonials.*', 'icon' => 'chat'],
        ]],
        ['heading' => 'Content', 'items' => [
            ['route' => 'admin.blogs.index', 'label' => 'Blog', 'pattern' => 'admin.blogs.*', 'icon' => 'pencil'],
            ['route' => 'admin.pages.index', 'label' => 'Pages', 'pattern' => 'admin.pages.*', 'icon' => 'doc'],
        ]],
        ['heading' => 'System', 'items' => [
            ['route' => 'admin.settings.index', 'label' => 'Settings', 'pattern' => 'admin.settings.*', 'icon' => 'cog'],
        ]],
    ];
    $icons = [
        'grid' => '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25A2.25 2.25 0 018.25 10.5H6A2.25 2.25 0 013.75 8.25V6zM13.5 6A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
        'gem' => '<path stroke-linecap="round" stroke-linejoin="round" d="M6 3h12l3 6-9 12L3 9l3-6zM3 9h18M9 3l-3 6 6 12 6-12-3-6"/>',
        'tag' => '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/>',
        'pencil' => '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>',
        'doc' => '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
        'cog' => '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.241.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
        'image' => '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>',
        'chat' => '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
    ];
    $renderIcon = fn ($name) => '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor">'.($icons[$name] ?? '').'</svg>';
@endphp

<div x-data="{ sidebarOpen: false }" class="min-h-full">
    {{-- Mobile overlay --}}
    <div x-show="sidebarOpen" x-cloak @click="sidebarOpen=false"
         class="fixed inset-0 z-30 bg-stone-900/50 lg:hidden"
         x-transition.opacity></div>

    {{-- Sidebar --}}
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
           class="fixed inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-300 flex flex-col transition-transform duration-300 lg:translate-x-0">
        <div class="h-20 flex items-center justify-center px-6 border-b border-stone-800">
            <a href="{{ route('admin.dashboard') }}">
                {{-- Black line-art logo inverted to white for the dark sidebar --}}
                <img src="/logo.png" alt="Micro Art LTD" class="h-12 w-auto" style="filter: invert(1) brightness(2);">
            </a>
        </div>

        <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-6">
            @foreach ($nav as $group)
                <div>
                    <div class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">{{ $group['heading'] }}</div>
                    <div class="space-y-1">
                        @foreach ($group['items'] as $item)
                            @php $active = $item['pattern'] ? request()->routeIs($item['pattern']) : request()->routeIs($item['route']); @endphp
                            <a href="{{ route($item['route']) }}"
                               class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition {{ $active ? 'bg-amber-500 text-stone-900 shadow' : 'text-stone-300 hover:bg-stone-800 hover:text-white' }}">
                                {!! $renderIcon($item['icon']) !!}
                                <span>{{ $item['label'] }}</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </nav>

        <div class="px-3 py-4 border-t border-stone-800">
            <a href="http://localhost:3000" target="_blank"
               class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-300 hover:bg-stone-800 hover:text-white transition">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
                View storefront
            </a>
        </div>
    </aside>

    {{-- Main --}}
    <div class="lg:pl-64">
        {{-- Top header --}}
        <header class="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur border-b border-stone-200 flex items-center gap-4 px-4 lg:px-8">
            <button @click="sidebarOpen=true" class="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-stone-200 text-stone-600" aria-label="Open menu">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>
            </button>

            <div class="min-w-0">
                <nav class="text-xs text-stone-400">
                    <a href="{{ route('admin.dashboard') }}" class="hover:text-amber-600">Home</a>
                    @hasSection('breadcrumb') <span class="mx-1">/</span> @yield('breadcrumb') @endif
                </nav>
                <h1 class="text-lg font-semibold leading-tight truncate">@yield('title', 'Dashboard')</h1>
            </div>

            <div class="ml-auto flex items-center gap-3">
                @hasSection('actions') @yield('actions') @endif

                {{-- User menu --}}
                <div x-data="{ open: false }" class="relative">
                    <button @click="open=!open" class="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-stone-100 transition">
                        <span class="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">
                            {{ strtoupper(substr(auth()->user()?->name ?? 'A', 0, 1)) }}
                        </span>
                        <span class="hidden sm:block text-sm font-medium">{{ auth()->user()?->name }}</span>
                        <svg class="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>
                    </button>
                    <div x-show="open" x-cloak @click.outside="open=false" x-transition
                         class="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-stone-200 shadow-lg py-1.5 text-sm">
                        <div class="px-4 py-2 text-stone-400 text-xs border-b border-stone-100">{{ auth()->user()?->email }}</div>
                        <a href="{{ route('profile.edit') }}" class="block px-4 py-2 hover:bg-stone-50">Profile</a>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Log out</button>
                        </form>
                    </div>
                </div>
            </div>
        </header>

        <main class="p-4 lg:p-8 max-w-7xl">
            @if (session('status'))
                @php
                    $statusLabels = [
                        'profile-updated' => 'Profile updated.',
                        'password-updated' => 'Password updated.',
                    ];
                    $statusText = $statusLabels[session('status')] ?? session('status');
                @endphp
                <div x-data="{ show: true }" x-show="show" x-init="setTimeout(() => show=false, 4000)"
                     class="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
                    <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {{ $statusText }}
                    <button @click="show=false" class="ml-auto text-green-600 hover:text-green-800">&times;</button>
                </div>
            @endif

            @if ($errors->any())
                <div class="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    <p class="font-medium mb-1">Please fix the following:</p>
                    <ul class="list-disc list-inside space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @yield('content')
        </main>
    </div>
</div>
</body>
</html>
