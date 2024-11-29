<?php

namespace Database\Factories;

use App\Models\LegalnarSeries;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LegalnarSeriesFactory extends Factory
{
    protected $model = LegalnarSeries::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(4);
        $levels = ['beginner', 'intermediate', 'advanced'];
        $categories = ['Trademark', 'Business Law', 'Intellectual Property', 'Contracts'];
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(3, true),
            'learning_outcomes' => $this->generateLearningOutcomes(),
            'level' => $this->faker->randomElement($levels),
            'category' => $this->faker->randomElement($categories),
            'topics' => $this->generateTopics(),
            'thumbnail_path' => 'series/thumbnails/sample-' . Str::random(10) . '.jpg',
            'price' => $this->faker->randomFloat(2, 99, 499),
            'is_featured' => $this->faker->boolean(20),
            'is_published' => $this->faker->boolean(80),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'total_duration_minutes' => 0, // Will be updated when sessions are added
            'total_sessions' => 0, // Will be updated when sessions are added
            'instructor_id' => User::factory(),
        ];
    }

    private function generateLearningOutcomes(): string
    {
        $outcomes = [];
        $count = $this->faker->numberBetween(4, 6);
        
        for ($i = 0; $i < $count; $i++) {
            $outcomes[] = "- " . $this->faker->sentence();
        }
        
        return implode("\n", $outcomes);
    }

    private function generateTopics(): array
    {
        return $this->faker->words($this->faker->numberBetween(3, 6));
    }

    public function featured(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_featured' => true,
            ];
        });
    }

    public function published(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_published' => true,
                'published_at' => now(),
            ];
        });
    }

    public function draft(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_published' => false,
                'published_at' => null,
            ];
        });
    }

    public function withSessions($count = 3): static
    {
        return $this->afterCreating(function (LegalnarSeries $series) use ($count) {
            \App\Models\Legalnar::factory()
                ->count($count)
                ->sequence(fn ($sequence) => ['session_number' => $sequence->index + 1])
                ->create([
                    'series_id' => $series->id,
                    'instructor_id' => $series->instructor_id,
                    'category' => $series->category,
                    'level' => $series->level,
                ]);
        });
    }
}
