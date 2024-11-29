<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Models\User;

class Insight extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category',
        'tags',
        'published_at',
        'read_time',
        'is_featured',
        'meta_title',
        'meta_description',
        'author_id',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
    ];

    // Automatically generate slug from title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($insight) {
            if (! $insight->slug) {
                $insight->slug = Str::slug($insight->title);
            }
        });
    }

    // Relationships
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeWithTag($query, $tag)
    {
        return $query->where('tags', 'like', "%$tag%");
    }

    // Accessors
    public function getFormattedPublishDateAttribute()
    {
        return $this->published_at?->format('F j, Y');
    }

    public function getReadTimeFormattedAttribute()
    {
        return $this->read_time ? $this->read_time . ' min read' : null;
    }

    // Helper methods
    public function isPublished()
    {
        return !is_null($this->published_at) && $this->published_at <= now();
    }

    public function getMetaTitle()
    {
        return $this->meta_title ?? $this->title;
    }

    public function getMetaDescription()
    {
        return $this->meta_description ?? Str::limit(strip_tags($this->excerpt), 160);
    }

    // Calculate read time based on content length
    public function calculateReadTime()
    {
        $wordsPerMinute = 200;
        $wordCount = str_word_count(strip_tags($this->content));
        $this->read_time = ceil($wordCount / $wordsPerMinute);
        return $this;
    }
}
