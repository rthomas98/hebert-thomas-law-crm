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
        Schema::create('case_results', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('case_type');
            $table->text('description');
            $table->decimal('amount', 15, 2)->nullable();
            $table->string('outcome');
            $table->date('date_resolved');
            $table->text('client_testimonial')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_results');
    }
};
