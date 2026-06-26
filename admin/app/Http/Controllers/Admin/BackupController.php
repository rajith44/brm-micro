<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class BackupController extends Controller
{
    private function dir(): string
    {
        return storage_path('app/backups');
    }

    public function index()
    {
        File::ensureDirectoryExists($this->dir());

        $backups = collect(File::glob($this->dir().'/backup-*.zip'))
            ->sortDesc()
            ->map(fn ($path) => [
                'name' => basename($path),
                'size' => round(filesize($path) / 1048576, 2),
                'date' => date('M d, Y · H:i', filemtime($path)),
            ])
            ->values();

        return view('admin.backups.index', compact('backups'));
    }

    public function store()
    {
        @set_time_limit(0);
        $code = Artisan::call('backup:run');

        if ($code !== 0) {
            return redirect()->route('admin.backups.index')
                ->with('error', 'Backup failed: '.trim(Artisan::output()));
        }

        return redirect()->route('admin.backups.index')->with('status', 'Backup created successfully.');
    }

    public function download(string $file)
    {
        $path = $this->safePath($file);
        abort_unless($path && File::exists($path), 404);

        return response()->download($path);
    }

    public function destroy(string $file)
    {
        $path = $this->safePath($file);
        abort_unless($path && File::exists($path), 404);

        File::delete($path);

        return redirect()->route('admin.backups.index')->with('status', 'Backup deleted.');
    }

    /** Resolve a backup filename safely (prevents path traversal). */
    private function safePath(string $file): ?string
    {
        $name = basename($file);
        if (! preg_match('/^backup-[0-9]{8}-[0-9]{6}\.zip$/', $name)) {
            return null;
        }

        return $this->dir().'/'.$name;
    }
}
