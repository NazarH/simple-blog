<?php

namespace App\Http\Controllers\Admin;

use App\Models\Tag;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\Tags\UpdateRequest as TagsEditRequest;
use App\Http\Requests\Tags\StoreRequest;
use Illuminate\Http\Response;

class TagsController extends Controller
{
    public function store(StoreRequest $request): Response
    {
        $data = $request->validated();
        Tag::create($data);

        return response(null, 200);
    }

    public function update(UpdateRequest $request, Tag $tag): Response
    {
        $data = $request->validated();
        $tag->update([
            'is_active' => $data['is_active']
        ]);

        return response(null, 200);
    }

    public function edit(TagsEditRequest $request, Tag $tag): Response
    {
        $data = $request->validated();
        $tag->update($data);

        return response(null, 200);
    }

    public function destroy(Tag $tag): Response
    {
        $tag->delete();

        return response(null, 200);
    }
}
