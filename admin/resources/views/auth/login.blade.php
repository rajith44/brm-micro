<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Sign in · Micro Art LTD Admin</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full bg-stone-900 text-stone-800 antialiased">
<div class="min-h-full flex items-center justify-center p-4
            bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800">
    <div class="w-full max-w-md">
        {{-- Brand --}}
        <div class="text-center mb-8">
            <img src="/logo.png" alt="Micro Art LTD" class="h-14 w-auto mx-auto" style="filter: invert(1) brightness(2);">
            <p class="text-xs uppercase tracking-[0.3em] text-stone-400 mt-3">Admin Panel</p>
        </div>

        {{-- Card --}}
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <h1 class="font-semibold text-xl mb-1">Welcome back</h1>
            <p class="text-sm text-stone-500 mb-6">Sign in to manage your store.</p>

            @if (session('status'))
                <div class="mb-5 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
                    {{ session('status') }}
                </div>
            @endif

            @if ($errors->any())
                <div class="mb-5 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}" class="space-y-4">
                @csrf

                <div>
                    <label for="email" class="block text-sm font-medium mb-1">Email</label>
                    <input id="email" name="email" type="email" value="{{ old('email') }}" required autofocus autocomplete="username"
                           class="w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500">
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium mb-1">Password</label>
                    <input id="password" name="password" type="password" required autocomplete="current-password"
                           class="w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500">
                </div>

                <div class="flex items-center justify-between">
                    <label for="remember_me" class="inline-flex items-center gap-2 text-sm text-stone-600">
                        <input id="remember_me" name="remember" type="checkbox"
                               class="rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                        Remember me
                    </label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="text-sm text-amber-600 hover:underline">Forgot password?</a>
                    @endif
                </div>

                <button type="submit"
                        class="w-full bg-stone-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800 transition">
                    Sign in
                </button>
            </form>
        </div>

        <p class="text-center text-xs text-stone-500 mt-6">
            © {{ date('Y') }} Micro Art LTD — Admin
        </p>
    </div>
</div>
</body>
</html>
