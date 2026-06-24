<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_a_gemstone_product_with_five_images(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $category = Category::create([
            'type' => 'gemstone', 'name' => 'Blue Sapphire', 'slug' => 'blue-sapphire',
        ]);

        $images = [];
        for ($i = 1; $i <= 5; $i++) {
            $images[] = UploadedFile::fake()->image("g{$i}.jpg");
        }

        $response = $this->actingAs($user)->post(route('admin.products.store'), [
            'type' => 'gemstone',
            'category_id' => $category->id,
            'name' => '2.10ct Blue Sapphire',
            'price' => 1990,
            'short_detail' => 'Unheated / Oval',
            'gem_weight' => '2.10ct',
            'gem_origin' => 'Ceylon',
            'is_published' => '1',
            'images' => $images,
        ]);

        $response->assertRedirect(route('admin.products.index'));

        $product = Product::firstWhere('name', '2.10ct Blue Sapphire');
        $this->assertNotNull($product);
        $this->assertSame('gemstone', $product->type);
        $this->assertSame(5, $product->images()->count());
        $this->assertSame(1, $product->images()->where('is_primary', true)->count());
    }

    public function test_rejects_more_than_five_images(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $images = [];
        for ($i = 1; $i <= 6; $i++) {
            $images[] = UploadedFile::fake()->image("g{$i}.jpg");
        }

        $this->actingAs($user)->post(route('admin.products.store'), [
            'type' => 'gemstone',
            'name' => '6 Image Stone',
            'price' => 100,
            'images' => $images,
        ])->assertSessionHasErrors('images');

        $this->assertDatabaseMissing('products', ['name' => '6 Image Stone']);
    }

    public function test_rejects_a_product_without_required_fields(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('admin.products.store'), ['type' => 'gemstone'])
            ->assertSessionHasErrors(['name', 'price']);
    }

    public function test_blocks_guests_from_admin_area(): void
    {
        $this->get(route('admin.products.index'))->assertRedirect(route('login'));
    }
}
