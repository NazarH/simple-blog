<?php

namespace App\Http\Controllers\Api;

use App\Models\Rubric;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

    public function search(Request $request)
    {
        $search = $request->query('search');

        $query = Rubric::query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->where('is_active', '=', 1);
        }

        $rubrics = $query->get()->map(function ($rubric) {
            return [
                'value' => $rubric->id,
                'label' => $rubric->name,
            ];
        });

        return $rubrics;
    }
}
