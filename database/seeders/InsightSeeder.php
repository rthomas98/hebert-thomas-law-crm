<?php

namespace Database\Seeders;

use App\Models\Insight;
use App\Models\User;
use Illuminate\Database\Seeder;

class InsightSeeder extends Seeder
{
    public function run(): void
    {
        // Create a main author for insights
        $author = User::factory()->create([
            'name' => 'Robert Thomas',
            'email' => 'robert@hebert-thomas-law.com',
        ]);

        // Create featured insights
        Insight::factory()
            ->count(3)
            ->featured()
            ->published()
            ->state(['author_id' => $author->id])
            ->create();

        // Create insights for each category
        $categories = [
            'Trademark Law' => 8,
            'Business Law' => 6,
            'Estate Planning' => 4,
            'Privacy & Data Protection' => 4,
            'Intellectual Property' => 5,
            'Legal Tips' => 3,
            'Industry News' => 4
        ];

        foreach ($categories as $category => $count) {
            Insight::factory()
                ->count($count)
                ->published()
                ->inCategory($category)
                ->state(['author_id' => $author->id])
                ->create();
        }

        // Create some draft posts
        Insight::factory()
            ->count(5)
            ->draft()
            ->state(['author_id' => $author->id])
            ->create();
    }
}
