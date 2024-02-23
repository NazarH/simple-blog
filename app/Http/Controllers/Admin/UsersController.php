<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Response;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;
use Inertia\Response as InertiaResponse;

class UsersController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Admin/Users/IndexComponent');
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Users/CreateComponent');
    }

    public function store(StoreRequest $request): Response
    {
        $data = $request->validated();
        User::create($data);

        return response(null, 200);
    }

    public function update(UpdateRequest $request, User $user): Response
    {
        $data = $request->validated();
        $user->update([
            'role' => $data['role']
        ]);

        return response(null, 200);
    }

    public function deactivation(User $user): Response
    {
        $user->update([
            'is_active' => false
        ]);

        return response(null, 200);
    }

    public function activation(User $user): Response
    {
        $user->update([
            'is_active' => true
        ]);

        return response(null, 200);
    }
}
