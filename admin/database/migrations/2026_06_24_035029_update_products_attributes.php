<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->json('attributes')->nullable()->after('description');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'gem_weight', 'gem_shape', 'gem_color', 'gem_clarity',
                'gem_treatment', 'gem_origin', 'gem_dimensions', 'gem_certification',
                'jw_metal', 'jw_purity', 'jw_gross_weight', 'jw_stone_type',
                'jw_stone_weight', 'jw_size', 'jw_gender',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('attributes');
            $table->string('gem_weight')->nullable();
            $table->string('gem_shape')->nullable();
            $table->string('gem_color')->nullable();
            $table->string('gem_clarity')->nullable();
            $table->string('gem_treatment')->nullable();
            $table->string('gem_origin')->nullable();
            $table->string('gem_dimensions')->nullable();
            $table->string('gem_certification')->nullable();
            $table->string('jw_metal')->nullable();
            $table->string('jw_purity')->nullable();
            $table->string('jw_gross_weight')->nullable();
            $table->string('jw_stone_type')->nullable();
            $table->string('jw_stone_weight')->nullable();
            $table->string('jw_size')->nullable();
            $table->string('jw_gender')->nullable();
        });
    }
};
