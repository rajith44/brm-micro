<?php

use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public read-only storefront API (consumed by the Next.js site).
Route::prefix('api')->group(function () {
    Route::get('categories', [CatalogController::class, 'categories']);
    Route::get('products', [CatalogController::class, 'products']);
    Route::get('products/{slug}', [CatalogController::class, 'product']);
    Route::get('blogs', [CatalogController::class, 'blogs']);
    Route::get('blogs/{slug}', [CatalogController::class, 'blog']);
    Route::get('settings', [CatalogController::class, 'settings']);
    Route::get('sliders', [CatalogController::class, 'sliders']);
    Route::get('testimonials', [CatalogController::class, 'testimonials']);
});

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

Route::get('/dashboard', fn () => redirect()->route('admin.dashboard'))
    ->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', CategoryController::class)->except('show');
    Route::resource('products', ProductController::class)->except('show');
    Route::resource('blogs', BlogController::class)->except('show');
    Route::resource('sliders', SliderController::class)->except('show');
    Route::resource('testimonials', TestimonialController::class)->except('show');

    Route::get('pages', [PageController::class, 'index'])->name('pages.index');
    Route::get('pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
    Route::put('pages/{page}', [PageController::class, 'update'])->name('pages.update');

    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');

    Route::get('backups', [BackupController::class, 'index'])->name('backups.index');
    Route::post('backups', [BackupController::class, 'store'])->name('backups.store');
    Route::get('backups/{file}/download', [BackupController::class, 'download'])->name('backups.download');
    Route::delete('backups/{file}', [BackupController::class, 'destroy'])->name('backups.destroy');
});

require __DIR__.'/auth.php';
