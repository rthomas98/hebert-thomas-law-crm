<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Legalnar;

class LegalnarSeries extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'legalnar_series';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'learning_outcomes',
        'level',
        'category',
        'topics',
        'thumbnail_path',
        'price',
        'is_featured',
        'is_published',
        'published_at',
        'total_duration_minutes',
        'total_sessions',
        'instructor_id',
        'image',
    ];

    protected $casts = [
        'topics' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'price' => 'decimal:2',
        'total_duration_minutes' => 'integer',
        'total_sessions' => 'integer',
    ];

    // Automatically generate slug from title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($series) {
            if (! $series->slug) {
                $series->slug = Str::slug($series->title);
            }
        });
    }

    // Relationships
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function legalnars()
    {
        return $this->hasMany(Legalnar::class, 'series_id')
                    ->orderBy('session_number');
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

    // Helper Methods
    public function isPublished()
    {
        return $this->is_published && 
               !is_null($this->published_at) && 
               $this->published_at <= now();
    }

    public function getFormattedDuration()
    {
        $hours = floor($this->total_duration_minutes / 60);
        $minutes = $this->total_duration_minutes % 60;
        
        if ($hours > 0) {
            return "{$hours}h " . ($minutes > 0 ? "{$minutes}m" : "");
        }
        
        return "{$minutes}m";
    }

    public function getThumbnailUrl()
    {
        return $this->thumbnail_path ? asset('storage/' . $this->thumbnail_path) : null;
    }

    public function getProgress($userId)
    {
        // To be implemented when we add user progress tracking
        return 0;
    }

    public function updateTotalDuration()
    {
        $this->total_duration_minutes = $this->legalnars->sum('duration_minutes');
        $this->total_sessions = $this->legalnars->count();
        $this->save();
    }
}
