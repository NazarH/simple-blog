<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\View\View;
use App\Http\Controllers\Controller;

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
            'comments' => $comments
        ]);
    }
}
