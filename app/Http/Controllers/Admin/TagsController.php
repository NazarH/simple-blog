<?php

namespace App\Http\Controllers\Admin;

use App\Models\Tag;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Tags\StoreRequest;

class TagsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tags/IndexComponent');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Tag::create($data);

        return redirect(route('admin.tags.index'));
    }

    public function update(UpdateRequest $request, Tag $tag): RedirectResponse
    {
        $data = $request->validated();
        $tag->update([
            'is_active' => $data['is_active']
        ]);

        return redirect(route('admin.tags.index'));
    }

    public function edit(StoreRequest $request, Tag $tag): RedirectResponse
    {
        $data = $request->validated();
        $tag->update($data);

        return redirect(route('admin.tags.index'));
    }

    public function destroy(Tag $tag): RedirectResponse
    {
        $tag->delete();

        return redirect(route('admin.tags.index'));
    }
}
