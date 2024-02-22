<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Articles\StoreRequest;
use Illuminate\Http\JsonResponse;

class ArticlesController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Articles/IndexComponent');
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/FormComponent');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;

        $article = Article::create($data);
        $article->tags()->sync($data['tag_ids']);
        $article->rubrics()->sync($data['rubric_ids']);

        return redirect(route('admin.articles.index'));
    }

    public function edit()
    {
        return Inertia::render('Admin/Articles/EditComponent');
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $article->update([
           'title' => $request['title'],
            'text' => $request['text'],
        ]);
        $article->tags()->sync($request['tag_ids']);
        $article->rubrics()->sync($request['rubric_ids']);

        return redirect(route('admin.articles.index'));
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect(route('admin.articles.index'));
    }

    public function activeUpdate(UpdateRequest $request, Article $article): RedirectResponse
    {
        $data = $request->validated();

        $article->update([
            'is_active' => $data['is_active']
        ]);

        return redirect(route('admin.articles.index'));
    }

    public function upload(Request $request): JsonResponse
    {
        $url = asset('storage/'.$request->file('upload')->store('images', 'public'));

        $response = [
            'uploaded' => true,
            'url' => $url
        ];

        return response()->json($response);
    }
}
