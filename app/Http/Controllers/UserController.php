<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
// Removed unused JWTAuth import

class UserController extends Controller
{
    public function showRegister(Request $req)
    {
        $data = User::query()->get();
        return apiResponse(200, 'get data user successfully', $data);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email', 
            'password' => 'required|min:6',
            'role' => 'nullable|integer|in:0,1'
        ]);

        if ($request->hasFile('profile')) {
            $file = $request->file('profile');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('profiles'), $filename);
            $data['profile'] = url('profiles/'.$filename);
        }
        $data['role'] ??= 0;

        $data['password'] = Hash::make($data['password']);
         
        try {
            $register = User::create($data);
            if ($register) {
                return apiResponse(201, 'User registered', $register);
            } else {
                return apiResponse(500, 'User not registered', null);
            }
        } catch (Exception $e) {
            return apiResponse(500, 'Registration failed: ' . $e->getMessage(), null);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $credentials['email'])->first();

            if ($user && Hash::check($credentials['password'], $user->password)) {
                
                if (!$user->getKey()) {
                    return apiResponse(401, 'User missing primary key—check DB setup', null);
                }

                $token = $user->createToken('api-token')->plainTextToken;
                $role=$user->role;
                $message = $role == 0 ? 'Welcome to user' : 'Welcome to admin';
                return response()->json([
                    'status'=>200,
                    'message'=>'login successfully',
                    'role'=>$role,
                    'token'=>$token
                ]);
            } else {
                return apiResponse(401, 'Unauthorized—email or password wrong', null);
            }
        } catch (Exception $e) {
            return apiResponse(500, 'An error occurred: ' . $e->getMessage(), null);
        }
    }
}