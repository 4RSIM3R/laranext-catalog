<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Banner extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\BannerFactory> */
    use HasFactory, InteractsWithMedia;

    protected $guarded = [];

    protected $appends = ['thumbnail'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
    }

    public function getThumbnailAttribute()
    {
        return $this->getMedia('thumbnail')->first();
    }
}
