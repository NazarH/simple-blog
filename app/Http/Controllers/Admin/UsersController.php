<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/IndexComponent');
    }

    public function create()
    {
        return Inertia::render('Admin/Users/CreateComponent');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $data = $request->validated();
        User::create($data);

        return redirect(route('admin.users.index'));
    }

    public function update(UpdateRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $user->update([
            'role' => $data['role']
        ]);

        return redirect(route('admin.users.index'));
    }

    public function deactivation(User $user): RedirectResponse
    {
        $user->update([
            'is_active' => false
        ]);

        return redirect(route('admin.users.index'));
    }

    public function activation(User $user): RedirectResponse
    {
        $user->update([
            'is_active' => true
        ]);

        return redirect(route('admin.users.index'));
    }
}
