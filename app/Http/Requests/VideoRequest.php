<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoRequest extends FormRequest
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
        $rules = [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:videos,slug',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'youtube_url' => ['required', 'url', 'regex:/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/'],
        ];

        if (!$this->isMethod('post')) {
            $id = request()->route('id');
            $rules['slug'] = 'required|string|max:255|unique:videos,slug,' . $id;
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'youtube_url.regex' => 'Please enter a valid YouTube URL.',
        ];
    }
}
