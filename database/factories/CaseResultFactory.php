<?php

namespace Database\Factories;

use App\Models\CaseResult;
use Illuminate\Database\Eloquent\Factories\Factory;

class CaseResultFactory extends Factory
{
    protected $model = CaseResult::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $caseTypes = [
            'Trademark Registration',
            'Trademark Opposition',
            'Trademark Enforcement',
            'Business Law',
            'Estate Planning',
            'Privacy & Data Protection'
        ];

        $outcomes = ['Won', 'Settled', 'Dismissed', 'Withdrawn'];

        return [
            'title' => fake()->sentence(4),
            'case_type' => fake()->randomElement($caseTypes),
            'description' => fake()->paragraphs(3, true),
            'amount' => fake()->boolean(70) ? fake()->randomFloat(2, 5000, 500000) : null,
            'outcome' => fake()->randomElement($outcomes),
            'date_resolved' => fake()->dateTimeBetween('-2 years', 'now'),
            'client_testimonial' => fake()->boolean(60) ? fake()->paragraph() : null,
            'is_featured' => fake()->boolean(20),
            'is_published' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the case result is featured.
     */
    public function featured()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_featured' => true,
            ];
        });
    }

    /**
     * Indicate that the case result is of a specific type.
     */
    public function ofType(string $type)
    {
        return $this->state(function (array $attributes) use ($type) {
            return [
                'case_type' => $type,
            ];
        });
    }
}
