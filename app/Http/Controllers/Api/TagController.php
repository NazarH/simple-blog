<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\SearchRequest;
use App\Models\Tag;
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    public function index()
    {
        $paginator = Tag::paginate(5);
        $total = $paginator->total();

        $tags = $paginator->map(function ($tag) use ($total) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'is_active' => $tag->is_active,
                'total' => $total
            ];
        });

        return $tags;
    }

    public function search(SearchRequest $request)
    {
        $data = $request->validated();

        $query = Tag::query();

        if ($data['search']) {
            $query->where('name', 'like', '%' . $data['search'] . '%')
                ->active();
        }

        $tags = $query->take(10)->get()->map(function ($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->name,
            ];
        });

        return $tags;
    }
}
