<?php

namespace App\Http\Controllers;

use App\Models\Rubric;
use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Http\Requests\Articles\SearchRequest;

class HomeController extends Controller
{
    public function index()
    {
        $rubrics = Rubric::active()->get();
        $articles = Article::query()->active()->with([
            'rubrics',
            'tags' => fn($q) => $q->active(),
            'user'
        ])->whereHas('rubrics', function ($query){
            $query->where('is_active', 1);
        })->paginate(1);

        return view('pages.home', [
            'rubrics' => $rubrics,
            'articles' => $articles
        ]);
    }

    public function search(SearchRequest $request)
    {
        $data = $request->validated();
        $articles = Article::query()->active()->with([
            'rubrics',
            'tags' => fn($q) => $q->active(),
            'user'
        ])->where('title', 'like', '%'.$data['search'].'%')
        ->orWhere('text', 'like', '%'.$data['search'].'%')
        ->paginate(1);

        return view('pages.search', [
            'articles' => $articles,
            'title' => $data['search']
        ]);
    }
}
