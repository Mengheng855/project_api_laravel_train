<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable=[
        'course_name',
        'title',
        'description',
        'price',
        'discount',
        'total_price',
        'image',
        'user_id'
    ];
    public $primaryKey = 'course_id';
    public function courses(){
        return $this->belongsTo(User::class);
    }
}
