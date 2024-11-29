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
        Schema::create('legalnar_series', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('learning_outcomes')->nullable();
            $table->string('level'); // beginner, intermediate, advanced
            $table->string('category'); // e.g., 'Trademark', 'Business Law', etc.
            $table->json('topics')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->decimal('price', 8, 2)->nullable(); // For when we implement pricing
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->integer('total_duration_minutes')->default(0);
            $table->integer('total_sessions')->default(0);
            $table->foreignId('instructor_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legalnar_series');
    }
};
