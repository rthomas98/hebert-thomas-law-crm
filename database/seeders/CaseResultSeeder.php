<?php

namespace Database\Seeders;

use App\Models\CaseResult;
use Illuminate\Database\Seeder;

class CaseResultSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 featured case results
        CaseResult::factory()
            ->count(5)
            ->featured()
            ->create();

        // Create some trademark-related cases
        CaseResult::factory()
            ->count(10)
            ->ofType('Trademark Registration')
            ->create();

        CaseResult::factory()
            ->count(5)
            ->ofType('Trademark Opposition')
            ->create();

        CaseResult::factory()
            ->count(8)
            ->ofType('Trademark Enforcement')
            ->create();

        // Create some other legal service cases
        CaseResult::factory()
            ->count(7)
            ->ofType('Business Law')
            ->create();

        CaseResult::factory()
            ->count(5)
            ->ofType('Estate Planning')
            ->create();

        CaseResult::factory()
            ->count(5)
            ->ofType('Privacy & Data Protection')
            ->create();
    }
}
