<?php

namespace App\Http\Controllers\Front;

use App\Models\User;
use Illuminate\View\View;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Front\UpdateRequest;

class ProfileController extends Controller
{
    public function index(): View
    {
        return view("pages.profile");
    }

    public function update(UpdateRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $user->update($data);

        return redirect()->route('pages.profile');
    }
}
