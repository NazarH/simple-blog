<?php

namespace App\Http\Controllers\Api;

use App\Models\Rubric;
use App\Http\Controllers\Controller;

class RubricsController extends Controller
{
    public function index()
    {
        $rubrics = Rubric::paginate(10)->map(function ($rubric) {
            return [
                'id' => $rubric->id,
                'name' => $rubric->name,
                'is_active' => $rubric->is_active
            ];
        });

        return $rubrics;
    }
}
