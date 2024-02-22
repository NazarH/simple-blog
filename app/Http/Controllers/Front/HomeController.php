<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\Articles\SearchRequest;
use App\Models\Article;

class HomeController extends Controller
{
    public function index()
    {
        $articles = Article::query()->active()->with([
            'rubrics' => fn($q) => $q->active(),
            'tags' => fn($q) => $q->active(),
            'user'
        ])->paginate(9);

        return view('pages.home', [
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
        ])->where('title', 'like', '%'.$data['query'].'%')
        ->orWhere('text', 'like', '%'.$data['query'].'%')
        ->paginate(1);

        return view('pages.search', [
            'articles' => $articles,
            'title' => $data['query'],
        ]);
    }
}
