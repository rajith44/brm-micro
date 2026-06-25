<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /** Text setting keys that the form manages. */
    private array $textKeys = [
        'business_name', 'business_address', 'business_hours', 'business_tel',
        'business_mobile', 'business_whatsapp', 'business_email',
        'social_facebook', 'social_instagram', 'social_twitter', 'social_youtube',
        'social_tiktok', 'social_linkedin', 'social_pinterest',
        'seo_title', 'seo_description', 'seo_keywords',
    ];

    public function index()
    {
        $settings = Setting::map();

        return view('admin.settings.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $data = $request->validate(array_merge(
            ['hide_price' => ['nullable', 'boolean']],
            array_fill_keys($this->textKeys, ['nullable', 'string', 'max:2000']),
        ));

        Setting::set('hide_price', $request->boolean('hide_price') ? '1' : '0');

        foreach ($this->textKeys as $key) {
            Setting::set($key, $data[$key] ?? '');
        }

        return redirect()->route('admin.settings.index')->with('status', 'Settings saved.');
    }
}
