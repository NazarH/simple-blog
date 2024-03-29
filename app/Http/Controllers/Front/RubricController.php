<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Rubric;
use Illuminate\View\View;

class RubricController extends Controller
{
    public function index(Rubric $rubric): View
    {
        $articles = $rubric
            ->articles()
            ->active()
            ->with([
                'tags' => fn($q) => $q->active(),
                'image'
            ])
            ->paginate(9);

        return view('pages.rubric', [
            'rubric' => $rubric,
            'articles' => $articles,
        ]);
    }
}
