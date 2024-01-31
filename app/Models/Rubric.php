<?php

namespace App\Models;

use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rubric extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_rubric', 'rubric_id', 'article_id');
    }
}
