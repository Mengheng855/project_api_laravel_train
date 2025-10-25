<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\CourseController as ApiCourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LogoController;
use App\Models\Teacher;
use App\Http\Controllers\ForgotPasswordController;
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
    Route::get('/course/{course_id}', 'Course');
});
Route::controller(TeacherController::class)->group(function () {
    Route::get('/teacher', 'getTeachers');
    Route::get('/teacher/{teacher_id}', 'getTeacher');
});
Route::controller(UserController::class)->group(function () {
    Route::get('/user', 'showRegister');
    Route::get('/user/{id}', 'user');
    Route::delete('/deleteUser/{id}', 'deleteUser');
    Route::post('/editUser/{id}', 'editUser');
    Route::post('/register', 'register');
    Route::post('/login', 'login')->name('login');
});
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::controller(LogoController::class)->group(function () {
        Route::get('/logo', 'showLogo');
        Route::post('/addLogo', 'addLogo');
        Route::post('/editLogo/{id}', 'editLogo');
    });
    Route::controller(CourseController::class)->group(function () {
        Route::post('/addCourse', 'addCourse');
        Route::post('/editCourse/{id}', 'editCourse');
        Route::delete('deleteCourse/{id}', 'deleteCourse');
    });
    Route::controller(TeacherController::class)->group(function () {
        Route::post('/addTeacher', 'addTeacher');
        Route::delete('/deleteTeacher/{teacher_id}', 'deleteTeacher');
        Route::post('/editTeacher/{teacher_id}', 'editTeacher');
    });
    // Route::controller(OrderController::class)->group(function(){
    //     Route::post('/order/create','createOrder');
    // });
});
Route::controller(ForgotPasswordController::class)->group(function () {
    Route::post('/forgot-password', 'sendResetLink')->name('password.email');
    Route::post('/reset-password', 'resetPassword')->name('password.reset');
});
