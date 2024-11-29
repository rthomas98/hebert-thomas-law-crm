<?php

namespace Database\Factories;

use App\Models\Legalnar;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LegalnarFactory extends Factory
{
    protected $model = Legalnar::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(4);
        $levels = ['beginner', 'intermediate', 'advanced'];
        $categories = ['Trademark', 'Business Law', 'Intellectual Property', 'Contracts'];
        $isLive = $this->faker->boolean(70);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(3, true),
            'what_you_will_learn' => $this->generateLearningPoints(),
            'level' => $this->faker->randomElement($levels),
            'category' => $this->faker->randomElement($categories),
            'topics' => $this->generateTopics(),
            'thumbnail_path' => 'legalnars/thumbnails/sample-' . Str::random(10) . '.jpg',
            'video_url' => $isLive ? null : 'https://vimeo.com/' . $this->faker->numberBetween(100000000, 999999999),
            'meeting_url' => $isLive ? 'https://zoom.us/j/' . $this->faker->numberBetween(100000000, 999999999) : null,
            'scheduled_at' => $this->faker->dateTimeBetween('-1 month', '+2 months'),
            'duration_minutes' => $this->faker->randomElement([30, 45, 60, 90, 120]),
            'price' => $this->faker->randomFloat(2, 49, 199),
            'is_featured' => $this->faker->boolean(20),
            'is_published' => $this->faker->boolean(80),
            'is_live' => $isLive,
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'resources' => $this->generateResources(),
            'instructor_id' => User::factory(),
        ];
    }

    private function generateLearningPoints(): string
    {
        $points = [];
        $count = $this->faker->numberBetween(4, 6);
        
        for ($i = 0; $i < $count; $i++) {
            $points[] = "- " . $this->faker->sentence();
        }
        
        return implode("\n", $points);
    }

    private function generateTopics(): array
    {
        return $this->faker->words($this->faker->numberBetween(3, 6));
    }

    private function generateResources(): array
    {
        $resources = [];
        $count = $this->faker->numberBetween(2, 4);
        
        $types = ['slides', 'worksheet', 'checklist', 'guide', 'template'];
        
        for ($i = 0; $i < $count; $i++) {
            $type = $this->faker->randomElement($types);
            $resources[$type] = 'resources/legalnars/' . Str::random(10) . '.pdf';
        }
        
        return $resources;
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

    public function live(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_live' => true,
                'video_url' => null,
                'meeting_url' => 'https://zoom.us/j/' . $this->faker->numberBetween(100000000, 999999999),
            ];
        });
    }

    public function recorded(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_live' => false,
                'video_url' => 'https://vimeo.com/' . $this->faker->numberBetween(100000000, 999999999),
                'meeting_url' => null,
            ];
        });
    }

    public function upcoming(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'scheduled_at' => $this->faker->dateTimeBetween('now', '+2 months'),
            ];
        });
    }

    public function past(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'scheduled_at' => $this->faker->dateTimeBetween('-2 months', '-1 day'),
            ];
        });
    }
}
