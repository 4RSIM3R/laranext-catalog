<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Event extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory, InteractsWithMedia;

    protected $guarded = [];

    protected $appends = ['thumbnail'];

    protected $hidden = ['media'];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
    }

    public function getThumbnailAttribute()
    {
        return $this->getMedia('thumbnail')->first();
    }

    /**
     * Scope to get only upcoming events
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>=', now())->orderBy('start_date', 'asc');
    }

    /**
     * Scope to get only past events
     */
    public function scopeCompleted($query)
    {
        return $query->where('start_date', '<', now())->orderBy('start_date', 'desc');
    }
}
