<?php

namespace App\Http\Controllers;

use App\Models\Rubric;
use Illuminate\View\View;

class RubricController extends Controller
{
    public function index(Rubric $rubric): View
    {
        $articles = $rubric
                        ->articles()
                        ->active()
                        ->with(['tags' => fn($q) => $q->active()])
                        ->paginate(1);

        return view('pages.rubric', [
            'rubric' => $rubric,
            'articles' => $articles
        ]);
    }
}
