<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Rubric;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Rubrics\StoreRequest;

class RubricsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Rubrics/IndexComponent');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Rubric::create($data);

        return redirect(route('admin.rubrics.index'));
    }

    public function update(UpdateRequest $request, Rubric $rubric): RedirectResponse
    {
        $data = $request->validated();
        $rubric->update([
            'is_active' => $data['is_active']
        ]);

        return redirect(route('admin.rubrics.index'));
    }

    public function edit(StoreRequest $request, Rubric $rubric): RedirectResponse
    {
        $data = $request->validated();
        $rubric->update($data);

        return redirect(route('admin.rubrics.index'));
    }

    public function destroy(Rubric $rubric): RedirectResponse
    {
        $rubric->delete();

        return redirect(route('admin.rubrics.index'));
    }
}
