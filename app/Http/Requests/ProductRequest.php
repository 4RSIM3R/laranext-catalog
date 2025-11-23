<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = request()->route('id');

        return [
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'slug' => 'required|string|max:255|unique:products,slug,' . $id,
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'phone_number' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'manufacturer' => 'required|string',
            'address' => 'required|string',
            'license' => 'required|string',
            'production_capacity' => 'required|string',
            'thumbnail' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
        ];
    }
}
