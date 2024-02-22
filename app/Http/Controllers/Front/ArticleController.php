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
        $comments = Comment::query()
            ->where("article_id", '=', $article->id)
            ->with('user')
            ->paginate(1);

        return view("pages.article", [
            'article' => $article,
            'comments' => $comments,
            'rubrics' => Rubric::active()->get()
        ]);
    }
}
