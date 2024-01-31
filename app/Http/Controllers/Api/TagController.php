<?php

namespace App\Http\Controllers\Api;

use App\Models\Tag;
use App\Http\Controllers\Controller;

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
}
