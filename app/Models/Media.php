<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'filename',
        'original_name',
        'mime_type',
        'size',
        'variations',
        'alt_text',
        'title',
        'caption',
    ];

    protected $casts = [
        'variations' => 'array',
        'size' => 'integer',
    ];

    public function getUrlAttribute()
    {
        return $this->variations['original'] ?? null;
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->variations['thumbnail'] ?? null;
    }

    public function getSmallUrlAttribute()
    {
        return $this->variations['small'] ?? null;
    }

    public function getMediumUrlAttribute()
    {
        return $this->variations['medium'] ?? null;
    }

    public function getLargeUrlAttribute()
    {
        return $this->variations['large'] ?? null;
    }

    public function getHumanReadableSizeAttribute()
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    
        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }
    
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
