<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\Role;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($permission) {
            if (! $permission->slug) {
                $permission->slug = Str::slug($permission->name);
            }
        });
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
