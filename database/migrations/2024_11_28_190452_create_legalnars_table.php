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
        Schema::create('legalnars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_id')->nullable()->constrained('legalnar_series')->onDelete('cascade');
            $table->integer('session_number')->nullable(); // Only for series
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('what_you_will_learn')->nullable();
            $table->string('level'); // beginner, intermediate, advanced
            $table->string('category'); // e.g., 'Trademark', 'Business Law', etc.
            $table->json('topics')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('video_url')->nullable();
            $table->string('meeting_url')->nullable(); // For live sessions
            $table->timestamp('scheduled_at')->nullable();
            $table->integer('duration_minutes');
            $table->decimal('price', 8, 2)->nullable(); // For individual pricing
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false);
            $table->boolean('is_live')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->json('resources')->nullable(); // Additional materials, slides, etc.
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
        Schema::dropIfExists('legalnars');
    }
};
