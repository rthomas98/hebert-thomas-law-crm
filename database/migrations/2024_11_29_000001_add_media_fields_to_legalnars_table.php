<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('legalnars', function (Blueprint $table) {
            $table->string('featured_image')->nullable()->after('thumbnail_path');
            $table->json('additional_images')->nullable()->after('featured_image');
        });
    }

    public function down()
    {
        Schema::table('legalnars', function (Blueprint $table) {
            $table->dropColumn(['featured_image', 'additional_images']);
        });
    }
};
