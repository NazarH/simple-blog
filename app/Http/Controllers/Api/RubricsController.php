<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\SearchRequest;
use App\Models\Rubric;
use App\Http\Controllers\Controller;

class RubricsController extends Controller
{
    public function index()
    {
        $paginator = Rubric::paginate(5);
        $total = $paginator->total();

        $rubrics = $paginator->map(function ($rubric) use ($total){
            return [
                'id' => $rubric->id,
                'name' => $rubric->name,
                'is_active' => $rubric->is_active,
                'total' => $total
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
