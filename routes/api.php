<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\CourseController as ApiCourseController; // Unused? Remove if not needed.
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LogoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::controller(CourseController::class)->group(function () {
    Route::get('/courses', 'showCourse');   
});
Route::controller(UserController::class)->group(function () {
    Route::get('/user', 'showRegister');  
    Route::post('/register', 'register'); 
    Route::post('/login', 'login')->name('login'); 
});
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::controller(CourseController::class)->group(function () { 
        Route::post('/addCourse', 'addCourse');
        Route::delete('/deleteCourse/{course_id}', 'deleteCourse');
        Route::post('/editCourse/{id}', 'editCourse');
    });
    Route::controller(LogoController::class)->group(function () {
        Route::get('/logo', 'showLogo');
        Route::post('/addLogo', 'addLogo');
        Route::post('/editLogo/{id}', 'editLogo');
    });
});