<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('type'); // e.g., 'guide', 'template', 'checklist', 'form'
            $table->string('category'); // e.g., 'Trademark', 'Business Law', etc.
            $table->string('file_path')->nullable(); // For downloadable files
            $table->string('external_url')->nullable(); // For external resources
            $table->text('content')->nullable(); // For embedded content
            $table->json('metadata')->nullable(); // For additional resource-specific data
            $table->integer('download_count')->default(0);
            $table->boolean('requires_login')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_resources');
    }
};
