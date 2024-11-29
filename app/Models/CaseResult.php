<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CaseResult extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'case_type',
        'description',
        'amount',
        'outcome',
        'date_resolved',
        'client_testimonial',
        'is_featured',
        'is_published',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date_resolved' => 'date',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    // Scopes for filtering
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('case_type', $type);
    }

    // Format amount with dollar sign
    public function getFormattedAmountAttribute()
    {
        return $this->amount ? '$' . number_format($this->amount, 2) : null;
    }

    // Get a summary of the description
    public function getDescriptionSummaryAttribute()
    {
        return \Str::limit($this->description, 150);
    }
}
