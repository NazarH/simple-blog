<?php

namespace App\Http\Controllers\Front;

use App\Models\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Articles\CommentRequest;

class CommentController extends Controller
{
    public function add(CommentRequest $request, $article_id): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        Comment::create($data);

        return redirect()->route('pages.article', $article_id);
    }
}
