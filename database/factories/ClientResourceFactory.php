<?php

namespace Database\Factories;

use App\Models\ClientResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ClientResourceFactory extends Factory
{
    protected $model = ClientResource::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(4);
        $types = ['guide', 'template', 'checklist', 'form', 'document'];
        $categories = ['Trademark', 'Business Law', 'Intellectual Property', 'Contracts', 'Legal Forms'];
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph(3),
            'type' => $this->faker->randomElement($types),
            'category' => $this->faker->randomElement($categories),
            'file_path' => $this->faker->boolean(70) ? 'resources/sample-' . Str::random(10) . '.pdf' : null,
            'external_url' => $this->faker->boolean(30) ? $this->faker->url() : null,
            'content' => $this->faker->boolean(50) ? $this->generateContent() : null,
            'metadata' => $this->generateMetadata(),
            'download_count' => $this->faker->numberBetween(0, 1000),
            'requires_login' => $this->faker->boolean(30),
            'is_featured' => $this->faker->boolean(20),
            'is_published' => $this->faker->boolean(80),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'author_id' => User::factory(),
        ];
    }

    private function generateContent(): string
    {
        $content = "# " . $this->faker->sentence() . "\n\n";
        $content .= "## Overview\n\n";
        $content .= $this->faker->paragraph(3) . "\n\n";
        $content .= "## Key Points\n\n";
        
        for ($i = 0; $i < 3; $i++) {
            $content .= "* " . $this->faker->sentence() . "\n";
        }
        
        $content .= "\n## Details\n\n";
        $content .= $this->faker->paragraph(4) . "\n\n";
        $content .= "### Important Notes\n\n";
        $content .= $this->faker->paragraph(2);
        
        return $content;
    }

    private function generateMetadata(): array
    {
        return [
            'version' => $this->faker->semver(),
            'last_updated' => $this->faker->date(),
            'file_size' => $this->faker->numberBetween(100, 5000) . 'KB',
            'language' => 'en',
            'tags' => $this->faker->words(3),
        ];
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

    public function requiresLogin(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'requires_login' => true,
            ];
        });
    }
}
