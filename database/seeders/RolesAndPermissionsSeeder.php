<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Create or get roles
        $adminRole = Role::firstOrCreate(
            ['slug' => 'admin'],
            [
                'name' => 'Administrator',
                'description' => 'Full access to all features',
            ]
        );

        $editorRole = Role::firstOrCreate(
            ['slug' => 'editor'],
            [
                'name' => 'Editor',
                'description' => 'Can manage content but not settings',
            ]
        );

        $userRole = Role::firstOrCreate(
            ['slug' => 'user'],
            [
                'name' => 'User',
                'description' => 'Regular user access',
            ]
        );

        // Create permissions
        $permissions = [
            // Case Results
            'view-case-results' => 'View case results',
            'create-case-results' => 'Create case results',
            'edit-case-results' => 'Edit case results',
            'delete-case-results' => 'Delete case results',
            
            // Insights
            'view-insights' => 'View insights',
            'create-insights' => 'Create insights',
            'edit-insights' => 'Edit insights',
            'delete-insights' => 'Delete insights',
            
            // Client Resources
            'view-client-resources' => 'View client resources',
            'create-client-resources' => 'Create client resources',
            'edit-client-resources' => 'Edit client resources',
            'delete-client-resources' => 'Delete client resources',
            
            // Legalnars
            'view-legalnars' => 'View legalnars',
            'create-legalnars' => 'Create legalnars',
            'edit-legalnars' => 'Edit legalnars',
            'delete-legalnars' => 'Delete legalnars',
            
            // Users
            'manage-users' => 'Manage users',
            'manage-roles' => 'Manage roles and permissions',
        ];

        foreach ($permissions as $slug => $name) {
            Permission::firstOrCreate(
                ['slug' => $slug],
                [
                    'name' => $name,
                    'description' => $name,
                ]
            );
        }

        // Assign permissions to roles
        $adminRole->permissions()->sync(Permission::all());

        $editorRole->permissions()->sync(
            Permission::whereIn('slug', [
                'view-case-results', 'create-case-results', 'edit-case-results',
                'view-insights', 'create-insights', 'edit-insights',
                'view-client-resources', 'create-client-resources', 'edit-client-resources',
                'view-legalnars', 'create-legalnars', 'edit-legalnars',
            ])->get()
        );

        $userRole->permissions()->sync(
            Permission::whereIn('slug', [
                'view-case-results',
                'view-insights',
                'view-client-resources',
                'view-legalnars',
            ])->get()
        );

        // Create or update admin users
        $admins = [
            [
                'name' => 'Robert Thomas',
                'email' => 'robert@hebert-thomas.com',
                'password' => 'password'
            ],
            [
                'name' => 'Admin User',
                'email' => 'info@empuls3.com',
                'password' => 'Us3er1!!1013'
            ]
        ];

        foreach ($admins as $admin) {
            $user = User::firstOrCreate(
                ['email' => $admin['email']],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make($admin['password']),
                    'email_verified_at' => now(),
                ]
            );

            // Sync admin role (this will remove other roles and ensure only admin role is assigned)
            $user->roles()->sync([$adminRole->id]);
        }
    }
}
