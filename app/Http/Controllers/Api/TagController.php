<?php

namespace App\Http\Controllers\Api;

use App\Models\Tag;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::paginate(10)->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'is_active' => $tag->is_active
            ];
        });

        return $tags;
    }

    public function search(Request $request)
    {
        $search = $request->query('search');

        $query = Tag::query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->where('is_active', '=', 1);
        }

        $tags = $query->get()->map(function ($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->name,
            ];
        });

        return $tags;
    }
}
