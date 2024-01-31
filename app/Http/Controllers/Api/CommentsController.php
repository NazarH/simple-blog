<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;

class CommentsController extends Controller
{
    public function index($id = null)
    {
        $query = Comment::with('user');

        if ($id !== null) {
            $query->where('article_id', $id);
        }

        $comments = $query->paginate(10)->map(function ($comment) {
            return [
                'id' => $comment->id,
                'user_id' => $comment->user_id,
                'text' => $comment->text,
                'user' => $comment->user
            ];
        });

        return $comments;
    }
}
