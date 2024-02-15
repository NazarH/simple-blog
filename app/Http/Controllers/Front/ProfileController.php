<?php

namespace App\Http\Controllers\Front;

use App\Models\Rubric;
use App\Models\User;
use Illuminate\View\View;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Front\UpdateRequest;

class ProfileController extends Controller
{
    public function index(): View
    {
        $rubrics = Rubric::active()->get();

        return view("pages.profile", compact('rubrics'));
    }

    public function update(UpdateRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $user->update($data);

        return redirect()->route('pages.profile');
    }
}
