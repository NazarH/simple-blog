<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Rubric;
use Illuminate\View\View;

class TagController extends Controller
{
    public function index(Tag $tag): View
    {
        $rubrics = Rubric::active()->get();

        $articles = $tag
                        ->articles()
                        ->active()
                        ->with(['tags' => fn($q) => $q->active()])
                        ->paginate(9);

        return view('pages.tag', [
            'tag' => $tag,
            'rubrics' => $rubrics,
            'articles' => $articles,
        ]);
    }
}
