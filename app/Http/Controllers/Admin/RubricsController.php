<?php

namespace App\Http\Controllers\Admin;

use App\Models\Rubric;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\Rubrics\UpdateRequest as RubricEditRequest;
use App\Http\Requests\Rubrics\StoreRequest;
use Illuminate\Http\Response;

class RubricsController extends Controller
{
    public function store(StoreRequest $request): Response
    {
        $data = $request->validated();
        Rubric::create($data);

        return response(null, 200);
    }

    public function update(UpdateRequest $request, Rubric $rubric): Response
    {
        $data = $request->validated();
        $rubric->update([
            'is_active' => $data['is_active']
        ]);

        return response(null, 200);
    }

    public function edit(RubricEditRequest $request, Rubric $rubric): Response
    {
        $data = $request->validated();
        $rubric->update($data);

        return response(null, 200);
    }

    public function destroy(Rubric $rubric): Response
    {
        $rubric->delete();

        return response(null, 200);
    }
}
