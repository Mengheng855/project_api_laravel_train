<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $primaryKey = 'teacher_id';
    protected $fillable=[
        'teacher_name',
        'major',
        'description',
        'profile_teacher'
    ];
}
