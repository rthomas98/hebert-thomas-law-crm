<?php

namespace Database\Seeders;

use App\Models\ClientResource;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientResourceSeeder extends Seeder
{
    public function run(): void
    {
        // Get the existing admin user
        $author = User::where('email', 'robert@hebert-thomas.com')->first();

        // Create featured trademark guides
        ClientResource::factory()->count(2)->create([
            'type' => 'guide',
            'category' => 'Trademark',
            'is_featured' => true,
            'author_id' => $author->id,
            'requires_login' => false,
        ]);

        // Create business law templates
        ClientResource::factory()->count(3)->create([
            'type' => 'template',
            'category' => 'Business Law',
            'author_id' => $author->id,
            'requires_login' => true,
        ]);

        // Create IP checklists
        ClientResource::factory()->count(2)->create([
            'type' => 'checklist',
            'category' => 'Intellectual Property',
            'author_id' => $author->id,
        ]);

        // Create contract templates
        ClientResource::factory()->count(3)->create([
            'type' => 'template',
            'category' => 'Contracts',
            'author_id' => $author->id,
            'requires_login' => true,
        ]);

        // Create legal forms
        ClientResource::factory()->count(2)->create([
            'type' => 'form',
            'category' => 'Legal Forms',
            'author_id' => $author->id,
            'requires_login' => true,
        ]);

        // Create some draft resources
        ClientResource::factory()->count(2)
            ->draft()
            ->create([
                'author_id' => $author->id,
            ]);

        // Create additional mixed resources
        ClientResource::factory()->count(10)->create([
            'author_id' => $author->id,
        ]);
    }
}
