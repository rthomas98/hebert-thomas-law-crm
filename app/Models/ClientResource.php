<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;

class ClientResource extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'type',
        'category',
        'file_path',
        'external_url',
        'content',
        'metadata',
        'download_count',
        'requires_login',
        'is_featured',
        'is_published',
        'published_at',
        'author_id',
    ];

    protected $casts = [
        'metadata' => 'array',
        'requires_login' => 'boolean',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'download_count' => 'integer',
    ];

    // Automatically generate slug from title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($resource) {
            if (! $resource->slug) {
                $resource->slug = Str::slug($resource->title);
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
        return $query->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeRequiresLogin($query)
    {
        return $query->where('requires_login', true);
    }

    // Helper methods
    public function isPublished()
    {
        return $this->is_published && 
               !is_null($this->published_at) && 
               $this->published_at <= now();
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
        return $this;
    }

    public function getResourceUrl()
    {
        return $this->external_url ?? 
               ($this->file_path ? asset('storage/' . $this->file_path) : null);
    }

    public function getFormattedDownloadCount()
    {
        return number_format($this->download_count);
    }

    public function getMetadataValue($key, $default = null)
    {
        return data_get($this->metadata, $key, $default);
    }

    public function getFileExtension()
    {
        if ($this->file_path) {
            return pathinfo($this->file_path, PATHINFO_EXTENSION);
        }
        return null;
    }

    public function getFileSize()
    {
        if ($this->file_path && Storage::exists($this->file_path)) {
            $bytes = Storage::size($this->file_path);
            $units = ['B', 'KB', 'MB', 'GB', 'TB'];
            $index = 0;
            
            while ($bytes >= 1024 && $index < count($units) - 1) {
                $bytes /= 1024;
                $index++;
            }
            
            return round($bytes, 2) . ' ' . $units[$index];
        }
        return null;
    }
}
