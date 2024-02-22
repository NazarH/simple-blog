<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Rubric;
use Illuminate\View\View;

class ArticleController extends Controller
{
    public function index(Article $article): View
    {
        return view("pages.article", [
            'article' => $article,
            'rubrics' => Rubric::active()->get()
        ]);
    }
}
