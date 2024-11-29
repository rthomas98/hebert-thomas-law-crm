<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Legalnar extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'series_id',
        'session_number',
        'title',
        'slug',
        'description',
        'what_you_will_learn',
        'level',
        'category',
        'topics',
        'thumbnail_path',
        'video_url',
        'meeting_url',
        'scheduled_at',
        'duration_minutes',
        'price',
        'is_featured',
        'is_published',
        'is_live',
        'published_at',
        'resources',
        'instructor_id',
        'featured_image',
        'additional_images',
    ];

    protected $casts = [
        'topics' => 'array',
        'resources' => 'array',
        'additional_images' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'is_live' => 'boolean',
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
        'price' => 'decimal:2',
        'duration_minutes' => 'integer',
    ];

    // Automatically generate slug from title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($legalnar) {
            if (! $legalnar->slug) {
                $legalnar->slug = Str::slug($legalnar->title);
            }
        });

        static::saved(function ($legalnar) {
            if ($legalnar->series) {
                $legalnar->series->updateTotalDuration();
            }
        });
    }

    // Relationships
    public function series()
    {
        return $this->belongsTo(LegalnarSeries::class, 'series_id');
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeLive($query)
    {
        return $query->where('is_live', true);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('scheduled_at', '>', now())
                    ->orderBy('scheduled_at');
    }

    public function scopePast($query)
    {
        return $query->where('scheduled_at', '<=', now())
                    ->orderBy('scheduled_at', 'desc');
    }

    // Helper Methods
    public function isPublished()
    {
        return $this->is_published && 
               !is_null($this->published_at) && 
               $this->published_at <= now();
    }

    public function isUpcoming()
    {
        return $this->scheduled_at > now();
    }

    public function isPast()
    {
        return $this->scheduled_at <= now();
    }

    public function getFormattedDuration()
    {
        $hours = floor($this->duration_minutes / 60);
        $minutes = $this->duration_minutes % 60;
        
        if ($hours > 0) {
            return "{$hours}h " . ($minutes > 0 ? "{$minutes}m" : "");
        }
        
        return "{$minutes}m";
    }

    public function getThumbnailUrl()
    {
        return $this->thumbnail_path ? asset('storage/' . $this->thumbnail_path) : null;
    }

    public function getResourceUrl($resourceKey)
    {
        $resources = $this->resources ?? [];
        return $resources[$resourceKey] ?? null;
    }

    public function getFormattedSchedule($timezone = null)
    {
        if (!$this->scheduled_at) {
            return null;
        }

        $date = $timezone 
            ? $this->scheduled_at->setTimezone($timezone) 
            : $this->scheduled_at;

        return $date->format('F j, Y g:i A T');
    }

    public function canJoin()
    {
        if (!$this->is_live || !$this->meeting_url) {
            return false;
        }

        $now = now();
        return $this->scheduled_at->subMinutes(15) <= $now && 
               $this->scheduled_at->addMinutes($this->duration_minutes) >= $now;
    }
}
