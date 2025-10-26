<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BannerRequest extends FormRequest
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
        $thumbnailRule = $this->isMethod('post')
            ? 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            : 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048';

        return [
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'button_text' => 'required|string|max:255',
            'button_link' => 'required|url',
            'thumbnail' => $thumbnailRule,
        ];
    }
}
