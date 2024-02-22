<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\SearchRequest;
use App\Models\Rubric;
use App\Http\Controllers\Controller;

class RubricsController extends Controller
{
    public function index()
    {
        $rubrics = Rubric::paginate(5)->map(function ($rubric) {
            return [
                'id' => $rubric->id,
                'name' => $rubric->name,
                'is_active' => $rubric->is_active
            ];
        });

        return $rubrics;
    }

    public function search(SearchRequest $request)
    {
        $data = $request->validated();

        $query = Rubric::query();

        if ($data['search']) {
            $query->where('name', 'like', '%' . $data['search'] . '%')
                ->active();
        }

        $rubrics = $query->take(10)->get()->map(function ($rubric) {
            return [
                'value' => $rubric->id,
                'label' => $rubric->name,
            ];
        });

        return $rubrics;
    }
}
