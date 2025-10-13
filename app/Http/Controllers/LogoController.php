<?php
namespace App\Http\Controllers;
use App\Models\Logo;
use Exception;
use Illuminate\Http\Request;
class LogoController extends Controller
{
    public function showLogo()
    {
        $data=Logo::query()->get();
        if($data){
            return apiResponse(200, 'Get data logo successfully', $data);
        }else{
            return apiResponse(500, 'Get data logo failed', []);
        }
    }
    public function addLogo(Request $req)
    {
        try {
            $data = $req->validate([
                'image_logo' => 'required'
            ]);
            if ($req->hasFile('image_logo')) {
                $file = $req->file('image_logo');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('logos'), $filename);
                $data['image_logo'] = $filename;
            }    
            $user = auth()->user();
            if ($user) {
                $data['user_id'] = $user->user_id ?? $user->id ?? null;
            }

            $addLogo = Logo::create($data);
            if ($addLogo) {
                return apiResponse(201, 'Logo added successfully', $addLogo);
            } else {
                return apiResponse(500, 'Logo added failed', null);
            }
        } catch (Exception $e) {
            return apiResponse(500, 'An error occurred: ' . $e->getMessage(), null);
        }
    }
    public function editLogo(Request $req, $id)
    {
        try {
            $logo = Logo::find($id);
            if (!$logo) {
                return apiResponse(404, 'Logo not found', null);
            }

            $data = $req->validate([
                'image_logo' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            if ($req->hasFile('image_logo')) {
                $file = $req->file('image_logo');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('logos'), $filename);
                $data['image_logo'] = $filename;
            }

            $logo->update($data);
            return apiResponse(200, 'Logo updated successfully', $logo);
        } catch (Exception $e) {
            return apiResponse(500, 'An error occurred: ' . $e->getMessage(), null);
        }
    }
}
