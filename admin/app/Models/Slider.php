<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'badge', 'title', 'text', 'primary_label', 'primary_link',
        'secondary_label', 'secondary_link', 'image', 'position', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'position' => 'integer',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return \App\Support\Media::url($this->image);
    }
}
