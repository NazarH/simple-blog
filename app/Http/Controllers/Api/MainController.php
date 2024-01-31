<?php

namespace App\Http\Controllers\Api;

use App\Models\Tag;
use App\Models\User;
use App\Models\Rubric;
use App\Models\Article;
use App\Http\Controllers\Controller;

class MainController extends Controller
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

        $rubrics = Rubric::paginate(10)->map(function ($rubric) {
            return [
                'id' => $rubric->id,
                'name' => $rubric->name,
                'is_active' => $rubric->is_active
            ];
        });

        $tags = Tag::paginate(10)->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'is_active' => $tag->is_active
            ];
        });

        $users = User::get();

        $arr = ['articles' => $articles, 'rubrics' => $rubrics, 'tags' => $tags, 'users' => $users];

        return $arr;
    }
}
