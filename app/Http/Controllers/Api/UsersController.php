<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::get();

        return $users;
    }

    public function auth()
    {
        $auth = Auth::user();

        return $auth;
    }

}
