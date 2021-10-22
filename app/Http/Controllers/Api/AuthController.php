<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|string|min:6'
        ]);

        if (Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Authenticated sucessfully'
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 400);
    }

    public function register(Request $request)
    {
        try {
            $form = $request->validate([
                'fName' => 'required|string|max:255',
                'lName' => 'required|string|max:255',
                'email' => 'required|unique:users|string',
                'password' => 'required|string|min:6'
            ]);
    
            $user = User::create([
                'fName' => $form['fName'],
                'lName' => $form['lName'],
                'email' => $form['email'],
                'password' => Hash::make($form['password']),
            ]);
    
            return response()->json([
                'message' => 'Created account successfully'
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function logout(Request $request)
    {
        auth()->logout();
    }
}
