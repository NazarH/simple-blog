<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;

class UsersController extends Controller
{
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
