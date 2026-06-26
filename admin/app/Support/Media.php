<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Image storage that writes directly into the app's public/ folder
 * (e.g. public/uploads/products/xxx.png) instead of storage/app/public.
 * This avoids needing a storage symlink — ideal for shared hosting.
 *
 * Stored DB value is a web-root path like "/uploads/products/xxx.png".
 */
class Media
{
    public static function store(UploadedFile $file, string $dir): string
    {
        $ext = $file->getClientOriginalExtension() ?: ($file->extension() ?: 'png');
        $name = Str::random(40).'.'.strtolower($ext);
        $folder = public_path("uploads/$dir");
        File::ensureDirectoryExists($folder);
        $file->move($folder, $name);

        return "/uploads/$dir/$name";
    }

    /** Absolute URL for a stored path (handles new /uploads paths and legacy storage paths). */
    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }
        if (Str::startsWith($path, '/')) {
            return url($path);
        }

        return Storage::disk('public')->url($path); // legacy storage path
    }

    public static function delete(?string $path): void
    {
        if (! $path || Str::startsWith($path, ['http://', 'https://'])) {
            return;
        }
        if (Str::startsWith($path, '/')) {
            File::delete(public_path(ltrim($path, '/')));
        } else {
            Storage::disk('public')->delete($path);
        }
    }
}
