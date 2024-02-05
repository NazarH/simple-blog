<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Rubric;
use Illuminate\View\View;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
    public function index(Article $article): View
    {
        $rubrics = Rubric::active()->get();

        $comments = Comment::query()
            ->where("article_id", '=', $article->id)
            ->with('user')
            ->paginate(1);

        return view("pages.article", [
            'article' => $article,
            'comments' => $comments,
            'rubrics' => $rubrics
        ]);
    }
}
