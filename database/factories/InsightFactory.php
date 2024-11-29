<?php

namespace Database\Factories;

use App\Models\Insight;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Insight>
 */
class InsightFactory extends Factory
{
    protected $model = Insight::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();
        $categories = [
            'Trademark Law',
            'Business Law',
            'Estate Planning',
            'Privacy & Data Protection',
            'Intellectual Property',
            'Legal Tips',
            'Industry News'
        ];

        $content = collect([
            fake()->paragraph(4),
            '## Key Points',
            '* ' . fake()->sentence(),
            '* ' . fake()->sentence(),
            '* ' . fake()->sentence(),
            fake()->paragraph(3),
            '### ' . fake()->words(3, true),
            fake()->paragraph(4),
            '### ' . fake()->words(3, true),
            fake()->paragraph(4),
            '## Conclusion',
            fake()->paragraph(2)
        ])->join("\n\n");

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => $content,
            'featured_image' => 'insights/' . fake()->numberBetween(1, 10) . '.jpg',
            'category' => fake()->randomElement($categories),
            'tags' => fake()->randomElements(['Trademark', 'IP Law', 'Business', 'Legal Updates', 'Compliance', 'Startups', 'Technology', 'International Law'], fake()->numberBetween(2, 4)),
            'published_at' => fake()->boolean(80) ? fake()->dateTimeBetween('-1 year', '+1 month') : null,
            'read_time' => fake()->numberBetween(3, 15),
            'is_featured' => fake()->boolean(20),
            'meta_title' => fake()->boolean(30) ? fake()->sentence() : null,
            'meta_description' => fake()->boolean(30) ? fake()->text(160) : null,
            'author_id' => User::factory(),
        ];
    }

    public function published()
    {
        return $this->state(function (array $attributes) {
            return [
                'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
            ];
        });
    }

    public function featured()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_featured' => true,
            ];
        });
    }

    public function draft()
    {
        return $this->state(function (array $attributes) {
            return [
                'published_at' => null,
            ];
        });
    }

    public function inCategory(string $category)
    {
        return $this->state(function (array $attributes) use ($category) {
            return [
                'category' => $category,
            ];
        });
    }
}
