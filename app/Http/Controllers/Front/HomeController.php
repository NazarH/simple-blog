<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Requests\Articles\SearchRequest;
use App\Models\Article;
use App\Models\Rubric;

class HomeController extends Controller
{
    public function index()
    {
        $articles = Article::query()->active()->with([
            'rubrics',
            'tags' => fn($q) => $q->active(),
            'user'
        ])->whereHas('rubrics', function ($query){
            $query->active();
        })->paginate(9);

        return view('pages.home', [
            'rubrics' => Rubric::active()->get(),
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
            'title' => $data['search'],
            'rubrics' => Rubric::active()->get()
        ]);
    }
}
