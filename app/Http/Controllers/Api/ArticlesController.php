<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Http\Controllers\Controller;

class ArticlesController extends Controller
{
    public function index()
    {
        $paginator = Article::paginate(5);
        $total = $paginator->total();

        $articles = $paginator->map(function ($article) use ($total){
            return [
                'id' => $article->id,
                'title' => $article->title,
                'text' => $article->text,
                'is_active' => $article->is_active,
                'total' => $total
            ];
        });

        return $articles;
    }

    public function edit($id)
    {
        $article = Article::find($id);

        $arr = [
            'article' => $article,
            'tags' => $article->tags,
            'rubrics' => $article->rubrics
        ];

        return $arr;
    }
}
