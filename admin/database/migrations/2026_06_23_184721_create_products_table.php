<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['gemstone', 'jewelry']);
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->string('short_detail')->nullable();   // e.g. "Unheated / Cushion"
            $table->text('description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->boolean('is_featured')->default(false);

            // --- Gemstone attributes ---
            $table->string('gem_weight')->nullable();      // carat
            $table->string('gem_shape')->nullable();       // Oval, Cushion...
            $table->string('gem_color')->nullable();
            $table->string('gem_clarity')->nullable();
            $table->string('gem_treatment')->nullable();   // Heated / Unheated
            $table->string('gem_origin')->nullable();
            $table->string('gem_dimensions')->nullable();
            $table->string('gem_certification')->nullable();

            // --- Jewelry attributes ---
            $table->string('jw_metal')->nullable();        // Gold, White Gold...
            $table->string('jw_purity')->nullable();       // 18K, 14K
            $table->string('jw_gross_weight')->nullable();
            $table->string('jw_stone_type')->nullable();
            $table->string('jw_stone_weight')->nullable();
            $table->string('jw_size')->nullable();
            $table->string('jw_gender')->nullable();

            $table->timestamps();

            $table->index(['type', 'is_published']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
