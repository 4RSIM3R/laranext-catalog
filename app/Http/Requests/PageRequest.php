<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'seo_config' => 'nullable|array',
            'seo_config.title' => 'nullable|string|max:60',
            'seo_config.description' => 'nullable|string|max:160',
            'seo_config.keywords' => 'nullable|string|max:255',
            'seo_config.author' => 'nullable|string|max:255',
            'seo_config.canonical' => 'nullable|url',
            'seo_config.locale' => 'nullable|string|max:10',
            'seo_config.language' => 'nullable|string|max:5',
            'seo_config.type' => 'nullable|string|in:article,website,blog',
            'seo_config.site_name' => 'nullable|string|max:255',
            'seo_config.twitter_card' => 'nullable|string|in:summary,summary_large_image,app,player',
            'seo_config.twitter_image' => 'nullable|string|max:500',
            'seo_config.twitter_site' => 'nullable|string|max:50',
            'seo_config.twitter_creator' => 'nullable|string|max:50',
            'seo_config.image' => 'nullable|string|max:500',
            'seo_config.image_width' => 'nullable|integer|min:1|max:4096',
            'seo_config.image_height' => 'nullable|integer|min:1|max:4096',
            'seo_config.image_alt' => 'nullable|string|max:255',
            'content' => 'nullable|array',
            'content.*' => 'nullable|string|max:1000',
            'is_active' => 'nullable|boolean',
        ];

        // Allow slug to be updated for existing pages (PUT/PATCH requests)
        if (request()->isMethod('PUT') || request()->isMethod('PATCH')) {
            $id = request()->route('id');
            $rules['slug'] = 'required|string|max:255|unique:pages,slug,' . $id;
        }

        return $rules;
    }
}
