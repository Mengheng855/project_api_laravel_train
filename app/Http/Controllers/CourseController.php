<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Exception;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function showCourse()
    {
        $getCourse = Course::query()->get();
        if ($getCourse) {
            return apiResponse(200, 'Get data course successfully', $getCourse);
        } else {
            return apiResponse(500, 'Get data course failed', null);
        }
    }
    public function addCourse(Request $req)
    {
        try {
            $data = $req->validate([
                'course_name' => 'required|string',
                'title' => 'required|string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'discount' => 'numeric'
            ]);
            $data['total_price'] = $req->price - ($req->price  * ($req->discount ?? 0) / 100);
            if ($req->hasFile('image')) {
                $file = $req->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('courses'), $filename);
                $data['image'] = url('courses/'.$filename);
            }
            $addCourse = Course::create($data);
            if ($addCourse) {
                return apiResponse(201, 'Course added successfully', $addCourse);
            } else {
                return apiResponse(500, 'Course added failed', null);
            }
        } catch (Exception $e) {
            return apiResponse(500, 'An error occurred: ' . $e->getMessage(

            ), null);
        }
    }
    public function deleteCourse($course_id){
        try {
            $course = Course::find($course_id);
            if ($course) {
                $course->delete();
                return apiResponse(200, 'Course deleted successfully', null);
            } else {
                return apiResponse(404, 'Course not found', null);
            }
        } catch (Exception $th) {
            return apiResponse(500, 'An error occurred: ' . $th->getMessage(), null);
        }
    }
    public function editCourse(Request $req, $id){
        try {
            $course = Course::find($id);
            if (!$course) {
                return apiResponse(404, 'Course not found', null);
            }

            $data = $req->validate([
                'course_name' => 'sometimes|required|string',
                'title' => 'sometimes|required|string',
                'description' => 'sometimes|required|string',
                'price' => 'sometimes|required|numeric',
                'discount' => 'sometimes|numeric'
            ]);

            if (isset($data['price']) || isset($data['discount'])) {
                $price = $data['price'] ?? $course->price;
                $discount = $data['discount'] ?? $course->discount;
                $data['total_price'] = $price - ($price * ($discount ?? 0) / 100);
            }

            if ($req->hasFile('image')) {
                $file = $req->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('courses'), $filename);
                $data['image'] = url('courses/'.$filename   );
            }

            $course->update($data);
            return apiResponse(200, 'Course updated successfully', $course);
        } catch (Exception $e) {
            return apiResponse(500, 'An error occurred: ' . $e->getMessage(), null);
        }
    }
    public function Course($course_id){
        $course=Course::find($course_id);
        if($course){
            return apiResponse(200,'successfully',$course);
        }else{
            return apiResponse(500,'can not get course',null);
        }
    }
}
