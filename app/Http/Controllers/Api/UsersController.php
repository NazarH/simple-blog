<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::paginate(10)->map(function ($user) {
            return [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active
            ];
        });

        return $users;
    }

    public function auth()
    {
        $auth = Auth::user();

        return $auth;
    }

}
