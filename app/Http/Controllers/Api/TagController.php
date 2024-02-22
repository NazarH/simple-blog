<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\SearchRequest;
use App\Models\Tag;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::paginate(5)->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'is_active' => $tag->is_active
            ];
        });

        return $tags;
    }

    public function search(SearchRequest $request)
    {
        $search = $request->validated();

        $query = Tag::query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%')
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
