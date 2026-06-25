@extends('admin.layout')
@section('title', 'Settings')
@section('breadcrumb', 'Settings')

@php
    $field = 'w-full rounded-lg border-stone-300 focus:border-amber-500 focus:ring-amber-500';
    $val = fn ($k, $d = '') => old($k, $settings[$k] ?? $d);
@endphp

@section('content')
    <form method="POST" action="{{ route('admin.settings.update') }}" class="max-w-3xl space-y-6">
        @csrf
        @method('PUT')

        {{-- Storefront --}}
        <div class="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg mb-1">Storefront</h2>
            <p class="text-sm text-stone-500 mb-5">Control how products appear on the public website.</p>
            <label class="flex items-start gap-3">
                <input type="checkbox" name="hide_price" value="1" @checked(($settings['hide_price'] ?? '0') === '1')
                    class="mt-1 rounded border-stone-300 text-amber-500 focus:ring-amber-500">
                <span>
                    <span class="font-medium">Hide prices on the website</span>
                    <span class="block text-sm text-stone-500">When enabled, product prices are not shown anywhere on the storefront (visitors enquire instead).</span>
                </span>
            </label>
        </div>

        {{-- Business details --}}
        <div class="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg mb-5">Business Details</h2>
            <div class="grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium mb-1">Business name</label>
                    <input type="text" name="business_name" value="{{ $val('business_name') }}" class="{{ $field }}">
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium mb-1">Address</label>
                    <input type="text" name="business_address" value="{{ $val('business_address') }}" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Opening hours</label>
                    <input type="text" name="business_hours" value="{{ $val('business_hours') }}" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Telephone</label>
                    <input type="text" name="business_tel" value="{{ $val('business_tel') }}" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Mobile</label>
                    <input type="text" name="business_mobile" value="{{ $val('business_mobile') }}" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">WhatsApp (digits only, intl)</label>
                    <input type="text" name="business_whatsapp" value="{{ $val('business_whatsapp') }}" placeholder="447533491025" class="{{ $field }}">
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="business_email" value="{{ $val('business_email') }}" class="{{ $field }}">
                </div>
            </div>
        </div>

        {{-- Social --}}
        <div class="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg mb-5">Social Media Links</h2>
            <div class="grid sm:grid-cols-2 gap-4">
                @foreach ([
                    'social_facebook' => 'Facebook',
                    'social_instagram' => 'Instagram',
                    'social_twitter' => 'X / Twitter',
                    'social_youtube' => 'YouTube',
                    'social_tiktok' => 'TikTok',
                    'social_linkedin' => 'LinkedIn',
                    'social_pinterest' => 'Pinterest',
                ] as $key => $label)
                    <div>
                        <label class="block text-sm font-medium mb-1">{{ $label }}</label>
                        <input type="url" name="{{ $key }}" value="{{ $val($key) }}" placeholder="https://…" class="{{ $field }}">
                    </div>
                @endforeach
            </div>
        </div>

        {{-- SEO --}}
        <div class="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8">
            <h2 class="font-semibold text-lg mb-5">SEO</h2>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Meta title</label>
                    <input type="text" name="seo_title" value="{{ $val('seo_title') }}" class="{{ $field }}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Meta description</label>
                    <textarea name="seo_description" rows="3" class="{{ $field }}">{{ $val('seo_description') }}</textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Meta keywords</label>
                    <input type="text" name="seo_keywords" value="{{ $val('seo_keywords') }}" placeholder="ceylon sapphire, gemstones, …" class="{{ $field }}">
                </div>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <button class="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-800">Save Settings</button>
        </div>
    </form>
@endsection
