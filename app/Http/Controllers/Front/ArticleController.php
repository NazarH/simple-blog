<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\View\View;

class ArticleController extends Controller
{
    public function index(Article $article): View
    {
        return view("pages.article", [
            'article' => $article
        ]);
    }
}
