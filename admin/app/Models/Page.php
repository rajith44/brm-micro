<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['key', 'title', 'subtitle', 'image', 'content'];

    public function getImageUrlAttribute(): ?string
    {
        return \App\Support\Media::url($this->image);
    }
}
