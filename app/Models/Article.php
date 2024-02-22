<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $cast = [
        'is_active' => 'bool'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function rubrics()
    {
        return $this->belongsToMany(Rubric::class, 'article_rubric', 'article_id', 'rubric_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'article_tag', 'article_id', 'tag_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }


}
