<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Articles\UpdateRequest as ArticleUpdate;
use App\Models\Image;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Articles\StoreRequest;
use Illuminate\Http\JsonResponse;
use Inertia\Response as InertiaResponse;

class ArticlesController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Admin/Articles/IndexComponent');
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Articles/FormComponent');
    }

    public function store(StoreRequest $request): Response
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;

        $article = Article::create($data);
        $article->tags()->sync($data['tag_ids']);
        $article->rubrics()->sync($data['rubric_ids']);

        preg_match('/<img[^>]+src="([^">]+)"/', $data['text'], $matches);
        $src = $matches[1] ?? '';
        Image::create([
            'article_id' => $article->id,
            'image_url' => $src
        ]);

        return response(null, 200);
    }

    public function edit(): InertiaResponse
    {
        return Inertia::render('Admin/Articles/EditComponent');
    }

    public function update(ArticleUpdate $request, Article $article): Response
    {
        $data = $request->validated();

        $article->update([
            'title' => $data['title'],
            'text' => $data['text'],
        ]);

        $tags = is_array(head($data['tag_ids']))
            ? Arr::pluck($data['tag_ids'], 'value')
            : $data['tag_ids'];
        $rubrics = is_array(head($data['rubric_ids']))
            ? Arr::pluck($data['rubric_ids'], 'value')
            : $data['rubric_ids'];

        $article->tags()->sync($tags);
        $article->rubrics()->sync($rubrics);

        return response(null, 200);
    }

    public function destroy(Article $article): Response
    {
        $article->delete();

        return response(null, 200);
    }

    public function activeUpdate(UpdateRequest $request, Article $article): Response
    {
        $data = $request->validated();

        $article->update([
            'is_active' => $data['is_active']
        ]);

        return response(null, 200);
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
