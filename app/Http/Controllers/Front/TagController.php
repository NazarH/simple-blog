<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Rubric;
use App\Models\Tag;
use Illuminate\View\View;

class TagController extends Controller
{
    public function index(Tag $tag): View
    {
        $articles = $tag
            ->articles()
            ->active()
            ->with(['tags' => fn($q) => $q->active()])
            ->paginate(9);

        return view('pages.tag', [
            'tag' => $tag,
            'rubrics' => Rubric::active()->get(),
            'articles' => $articles,
        ]);
    }
}
