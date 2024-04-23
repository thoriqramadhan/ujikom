<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = ['customer_name', 'order_time', 'status'];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function managements()
    {
        return $this->hasOne(Managements::class);
    }
}
