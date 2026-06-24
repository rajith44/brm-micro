<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = [
        'type', 'name', 'slug', 'image', 'description', 'position', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'position' => 'integer',
    ];

    public const TYPES = ['gemstone' => 'Gemstone', 'jewelry' => 'Jewelry'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Resolve the display URL — absolute paths (seeded /coloredGems/…) are used
     * as-is; uploaded files resolve through the public storage disk.
     */
    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        return Str::startsWith($this->image, ['http://', 'https://', '/'])
            ? $this->image
            : Storage::url($this->image);
    }
}
