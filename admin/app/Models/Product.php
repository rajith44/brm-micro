<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'type', 'category_id', 'name', 'slug', 'sku', 'price',
        'short_detail', 'description', 'is_published', 'is_featured',
        // gemstone
        'gem_weight', 'gem_shape', 'gem_color', 'gem_clarity',
        'gem_treatment', 'gem_origin', 'gem_dimensions', 'gem_certification',
        // jewelry
        'jw_metal', 'jw_purity', 'jw_gross_weight', 'jw_stone_type',
        'jw_stone_weight', 'jw_size', 'jw_gender',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public const TYPES = ['gemstone' => 'Gemstone', 'jewelry' => 'Jewelry'];
    public const MAX_IMAGES = 5;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('position');
    }

    public function primaryImage()
    {
        return $this->images->firstWhere('is_primary', true) ?? $this->images->first();
    }
}
