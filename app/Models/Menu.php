<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menus';

    protected $fillable = [
        'categories_id',
        'nama',
        'harga',
        'image'
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class, 'categories_id', 'id');
    }
}
