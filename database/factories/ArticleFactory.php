<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'slug' => fake()->unique()->slug(),
            'content' => fake()->paragraphs(5, true),
            'excerpt' => fake()->text(150),
            'tags' => fake()->randomElements(['Berita', 'Pelatihan', 'Pengumuman', 'Kegiatan', 'Tips'], fake()->numberBetween(1, 3)),
        ];
    }
}
