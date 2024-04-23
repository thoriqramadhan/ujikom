<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Managements extends Model
{
    use HasFactory;

    protected $table = 'managements';

    protected $fillable = [
        'order_id',
        'sub_total',
        'pajak',
        'total'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
