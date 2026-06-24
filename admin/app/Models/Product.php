<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'type', 'category_id', 'name', 'slug', 'sku', 'price',
        'short_detail', 'description', 'attributes', 'is_published', 'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'attributes' => 'array',
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

    /**
     * Grouped attribute fields per product type and (for jewelry) subcategory slug.
     * Drives the dynamic "Add Product" form and detail display.
     * Shape: [ type => [ variantKey => [ ['title' => ..., 'fields' => [key => label]], ... ] ] ]
     */
    public static function attributeSchema(): array
    {
        return [
            'gemstone' => [
                // Shown for every gemstone.
                'common' => [
                    ['title' => 'Gemstone Information', 'fields' => [
                        'stone' => 'Stone',
                        'species' => 'Species',
                        'enhancement' => 'Enhancement',
                    ]],
                    ['title' => 'Gemstone Details', 'fields' => [
                        'gem_weight' => 'Weight (carat)',
                        'gem_shape' => 'Shape / Cut',
                        'gem_color' => 'Color',
                        'gem_clarity' => 'Clarity',
                        'gem_treatment' => 'Treatment',
                        'gem_origin' => 'Origin',
                        'gem_dimensions' => 'Dimensions',
                        'gem_certification' => 'Certification',
                    ]],
                ],
            ],
            'jewelry' => [
                // Shown for every jewelry product.
                'common' => [
                    ['title' => 'Jewelry Details', 'fields' => [
                        'jw_metal' => 'Metal',
                        'jw_purity' => 'Metal Purity',
                        'jw_gross_weight' => 'Gross Weight',
                        'jw_stone_type' => 'Stone Type',
                        'jw_stone_weight' => 'Stone Weight',
                        'jw_size' => 'Size',
                        'jw_gender' => 'Gender',
                    ]],
                ],
                // Additional groups when the Rings subcategory is selected.
                'rings' => [
                    ['title' => 'Ring Information', 'fields' => [
                        'ring_size' => 'Ring Size',
                        'ring_metal' => 'Metal',
                        'shank_width' => 'Shank Width',
                    ]],
                    ['title' => 'Center Stone Information', 'fields' => [
                        'center_weight' => 'Weight',
                        'center_type' => 'Type',
                        'center_shape' => 'Shape',
                    ]],
                    ['title' => 'Side Stone Information', 'fields' => [
                        'side_type' => 'Type',
                        'side_number' => 'Number of Stones',
                        'side_weight' => 'Weight',
                        'side_color' => 'Color',
                        'side_clarity' => 'Clarity',
                    ]],
                ],
                // Additional groups when the Pendants subcategory is selected.
                'pendants' => [
                    ['title' => 'Pendant Information', 'fields' => [
                        'pendant_metal' => 'Metal',
                        'pendant_length' => 'Length',
                        'pendant_width' => 'Width',
                    ]],
                    ['title' => 'Stone Information', 'fields' => [
                        'stone_type' => 'Type',
                        'stone_number' => 'Number of Stones',
                        'stone_weight' => 'Weight',
                        'stone_shape' => 'Shape',
                        'stone_color' => 'Color',
                        'stone_clarity' => 'Clarity',
                    ]],
                ],
            ],
        ];
    }
}
