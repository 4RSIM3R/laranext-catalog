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
        ];

        if ($this->isMethod('post')) {
            $rules['video'] = 'required|file|mimes:mp4,mov,avi,wmv,flv,mpeg,mpg,m4v,3gp,3g2,mj2,mxf,mts,m2ts,ts,mkv,webm,ogg,ogv';
            $rules['thumbnail'] = 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048';
        } else {
            $id = request()->route('id');
            $rules['slug'] = 'required|string|max:255|unique:videos,slug,' . $id;
            $rules['video'] = 'nullable|file|mimes:mp4,mov,avi,wmv,flv,mpeg,mpg,m4v,3gp,3g2,mj2,mxf,mts,m2ts,ts,mkv,webm,ogg,ogv';
            $rules['thumbnail'] = 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048';
        }

        return $rules;
    }
}
