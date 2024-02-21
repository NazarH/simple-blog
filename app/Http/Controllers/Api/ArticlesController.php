<?php

namespace App\Http\Controllers\Api;

use App\Models\Tag;
use App\Models\Rubric;
use App\Models\Article;
use App\Http\Controllers\Controller;

class ArticlesController extends Controller
{
    public function index()
    {
        $articles = Article::paginate(5)->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'text' => $article->text,
                'is_active' => $article->is_active
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
