<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-1 month', '+3 months');
        $endDate = fake()->optional(0.7)->dateTimeBetween($startDate, '+1 week');

        return [
            'title' => fake()->sentence(),
            'slug' => fake()->unique()->slug(),
            'content' => fake()->paragraphs(5, true),
            'excerpt' => fake()->text(150),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'is_completed' => fake()->boolean(30), // 30% chance of being completed
        ];
    }
}
