<?php

namespace App\Http\Requests\Articles;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255'
            ],
            'text' => [
                'required',
                'string'
            ],
            'tag_ids' => [
                'array',
                Rule::exists('tags', 'id')
            ],
            'rubric_ids' => [
                'array',
                Rule::exists('rubrics', 'id')
            ],
        ];
    }
}
