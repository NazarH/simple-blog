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
        $articles = Article::paginate(10)->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'text' => $article->text,
                'is_active' => $article->is_active
            ];
        });

        return $articles;
    }

    public function form()
    {
        $tags = Tag::get();
        $rubrics = Rubric::get();
        $arr = ['tags' => $tags, 'rubrics' => $rubrics];

        return $arr;
    }

    public function edit($id)
    {
        $article = Article::find($id);
        $tags = Tag::get();
        $rubrics = Rubric::get();
        $a_tags = $article->tags;
        $a_rubrics = $article->rubrics;
        $arr = ['article' => $article, 'tags' => $tags, 'rubrics' => $rubrics, 'a_tags' => $a_tags, 'a_rubrics' => $a_rubrics];

        return $arr;
    }
}
