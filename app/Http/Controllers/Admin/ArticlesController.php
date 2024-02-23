<?php

namespace App\Http\Controllers\Admin;

use App\Models\Image;
use Illuminate\Support\Arr;
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

        $img = preg_match('/<img[^>]+src="([^">]+)"/', $data['text'], $matches);
        $src = $matches[1] ?? '';

        $data['user_id'] = Auth::user()->id;
        $article = Article::create($data);
        $article->tags()->sync($data['tag_ids']);
        $article->rubrics()->sync($data['rubric_ids']);

        Image::create([
            'article_id' => $article->id,
            'image_url' => $src
        ]);

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
        $tags = is_array(head($request['tag_ids']))
            ? Arr::pluck($request['tag_ids'], 'value')
            : $request['tag_ids'];
        $rubrics = is_array(head($request['rubric_ids']))
            ? Arr::pluck($request['rubric_ids'], 'value')
            : $request['rubric_ids'];

        $article->tags()->sync($tags);
        $article->rubrics()->sync($rubrics);

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
