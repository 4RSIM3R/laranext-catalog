<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:events,slug,' . $this->id,
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'thumbnail' => $this->isMethod('post')
                ? 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
                : 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_completed' => 'nullable|boolean',
        ];
    }
}
