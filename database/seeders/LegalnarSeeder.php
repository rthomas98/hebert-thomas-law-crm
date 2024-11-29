<?php

namespace Database\Seeders;

use App\Models\LegalnarSeries;
use App\Models\Legalnar;
use App\Models\User;
use Illuminate\Database\Seeder;

class LegalnarSeeder extends Seeder
{
    public function run(): void
    {
        // Get or create the instructor
        $instructor = User::firstOrCreate(
            ['email' => 'robert@hebert-thomas.com'],
            [
                'name' => 'Robert Thomas',
                'password' => bcrypt('password'),
            ]
        );

        // Create featured trademark series with sessions
        LegalnarSeries::factory()
            ->featured()
            ->published()
            ->create([
                'title' => 'Trademark Fundamentals Series',
                'category' => 'Trademark',
                'instructor_id' => $instructor->id,
                'level' => 'beginner',
                'price' => 299.99,
            ])
            ->each(function ($series) {
                // Create 4 sessions for the series
                Legalnar::factory()
                    ->count(4)
                    ->sequence(
                        [
                            'title' => 'Understanding Trademark Basics',
                            'session_number' => 1,
                        ],
                        [
                            'title' => 'Trademark Search and Selection',
                            'session_number' => 2,
                        ],
                        [
                            'title' => 'Filing Your Trademark Application',
                            'session_number' => 3,
                        ],
                        [
                            'title' => 'Maintaining and Protecting Your Trademark',
                            'session_number' => 4,
                        ]
                    )
                    ->create([
                        'series_id' => $series->id,
                        'instructor_id' => $series->instructor_id,
                        'category' => $series->category,
                        'level' => $series->level,
                    ]);
            });

        // Create Business Law series
        LegalnarSeries::factory()
            ->published()
            ->create([
                'title' => 'Business Formation Masterclass',
                'category' => 'Business Law',
                'instructor_id' => $instructor->id,
                'level' => 'intermediate',
                'price' => 399.99,
            ])
            ->each(function ($series) {
                Legalnar::factory()
                    ->count(3)
                    ->sequence(
                        [
                            'title' => 'Choosing the Right Business Structure',
                            'session_number' => 1,
                        ],
                        [
                            'title' => 'Business Registration and Compliance',
                            'session_number' => 2,
                        ],
                        [
                            'title' => 'Business Contracts and Agreements',
                            'session_number' => 3,
                        ]
                    )
                    ->create([
                        'series_id' => $series->id,
                        'instructor_id' => $series->instructor_id,
                        'category' => $series->category,
                        'level' => $series->level,
                    ]);
            });

        // Create standalone featured legalnars
        Legalnar::factory()
            ->count(2)
            ->featured()
            ->published()
            ->live()
            ->upcoming()
            ->create([
                'instructor_id' => $instructor->id,
            ]);

        // Create past recorded legalnars
        Legalnar::factory()
            ->count(3)
            ->published()
            ->recorded()
            ->past()
            ->create([
                'instructor_id' => $instructor->id,
            ]);

        // Create upcoming live legalnars
        Legalnar::factory()
            ->count(4)
            ->published()
            ->live()
            ->upcoming()
            ->create([
                'instructor_id' => $instructor->id,
            ]);

        // Create draft legalnars
        Legalnar::factory()
            ->count(2)
            ->draft()
            ->create([
                'instructor_id' => $instructor->id,
            ]);
    }
}
