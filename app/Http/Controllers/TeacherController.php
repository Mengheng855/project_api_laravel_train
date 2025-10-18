<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Exception;
use Illuminate\Http\Request;
use PDO;

class TeacherController extends Controller
{
    public function getTeachers()
    {
        try {
            $data = Teacher::all();
            return apiResponse(200, 'success', $data);
        } catch (Exception $e) {
            return apiResponse(500, 'unsuccess', $e->getMessage());
        }
    }
    public function getTeacher($id)
    {
        try {
            $data = Teacher::findOrFail($id);
            return apiResponse(200, 'success', $data);
        } catch (Exception $e) {
            return apiResponse(500, 'unsuccess', $e->getMessage());
        }
    }
    public function addTeacher(Request $req)
    {
        try {
            $data = $req->validate([
                'teacher_name' => 'required|string',
                'major' => 'required|string',
                'description' => 'required',
            ]);
            if ($req->hasFile('profile_teacher')) {
                $file = $req->file('profile_teacher');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('profile_teachers'), $filename);
                $data['profile_teacher'] = url('profile_teachers/' . $filename);
            }
            $addTeacher = Teacher::create($data);
            return apiResponse(201, 'success', $data);
        } catch (Exception $e) {
            return apiResponse(500, 'unsuccess', $e->getMessage());
        }
    }
    public function deleteTeacher($id)
    {
        try {
            $data = Teacher::findOrFail($id);
            $data->delete();
            return apiResponse(200, 'success', $data);
        } catch (Exception $e) {
            return apiResponse(500, 'unsuccess', $e->getMessage());
        }
    }
    public function editTeacher(Request $req, $teacher_id)
    {
        try {
            $edit = Teacher::findOrFail($teacher_id);
            if ($edit) {
                $data = $req->validate([
                    'teacher_name' => 'string',
                    'major' => 'string',
                    'description' => 'string',
                ]);
                if ($req->hasFile('profile_teacher')) {
                    $file = $req->file('profile_teacher');
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $file->move(public_path('profile_teachers'), $filename);
                    $data['profile_teacher'] = url('profile_teachers/' . $filename);
                }
            }else{
                return apiResponse(500, 'not found',null);
            }
            $edit->update($data);
            return apiResponse(200, 'success', $data);
        } catch (Exception $e) {
            return apiResponse(500, 'unsuccess', $e->getMessage());
        }
    }
}
