<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title', 'slug', 'author', 'image', 'excerpt', 'body',
        'is_published', 'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'date',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return \App\Support\Media::url($this->image);
    }
}
