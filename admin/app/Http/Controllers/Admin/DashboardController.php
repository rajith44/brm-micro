<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'gemstones' => Product::where('type', 'gemstone')->count(),
            'jewelry' => Product::where('type', 'jewelry')->count(),
            'categories' => Category::count(),
            'blogs' => Blog::count(),
        ];

        $recentProducts = Product::with('category')->latest()->take(6)->get();

        return view('admin.dashboard', compact('stats', 'recentProducts'));
    }
}
