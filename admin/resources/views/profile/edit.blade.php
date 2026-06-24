@extends('admin.layout')
@section('title', 'Profile')
@section('breadcrumb', 'Profile')

@php $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500'; @endphp

@section('content')
    <div class="max-w-3xl space-y-6">

        {{-- Profile information --}}
        <div class="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg">Profile Information</h2>
            <p class="text-sm text-stone-500 mt-1 mb-6">Update your account's name and email address.</p>

            <form method="POST" action="{{ route('profile.update') }}" class="space-y-4">
                @csrf
                @method('PATCH')

                <div>
                    <label class="block text-sm font-medium mb-1">Name</label>
                    <input type="text" name="name" value="{{ old('name', $user->name) }}" required autofocus class="{{ $field }}">
                    @error('name') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="email" value="{{ old('email', $user->email) }}" required class="{{ $field }}">
                    @error('email') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div class="pt-2">
                    <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                </div>
            </form>
        </div>

        {{-- Update password --}}
        <div class="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg">Update Password</h2>
            <p class="text-sm text-stone-500 mt-1 mb-6">Use a long, random password to keep your account secure.</p>

            <form method="POST" action="{{ route('password.update') }}" class="space-y-4">
                @csrf
                @method('PUT')

                <div>
                    <label class="block text-sm font-medium mb-1">Current Password</label>
                    <input type="password" name="current_password" autocomplete="current-password" class="{{ $field }}">
                    @error('current_password', 'updatePassword') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">New Password</label>
                    <input type="password" name="password" autocomplete="new-password" class="{{ $field }}">
                    @error('password', 'updatePassword') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Confirm Password</label>
                    <input type="password" name="password_confirmation" autocomplete="new-password" class="{{ $field }}">
                </div>

                <div class="pt-2">
                    <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save</button>
                </div>
            </form>
        </div>

        {{-- Delete account --}}
        <div class="bg-white rounded-2xl border border-red-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg text-red-700">Delete Account</h2>
            <p class="text-sm text-stone-500 mt-1 mb-6">
                Once your account is deleted, all of its resources and data will be permanently removed.
                Enter your password to confirm.
            </p>

            <form method="POST" action="{{ route('profile.destroy') }}" class="space-y-4"
                  onsubmit="return confirm('Are you sure you want to permanently delete your account?')">
                @csrf
                @method('DELETE')

                <div class="max-w-sm">
                    <label class="block text-sm font-medium mb-1">Password</label>
                    <input type="password" name="password" autocomplete="current-password" placeholder="Your password" class="{{ $field }}">
                    @error('password', 'userDeletion') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div class="pt-2">
                    <button class="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700">Delete Account</button>
                </div>
            </form>
        </div>
    </div>
@endsection
