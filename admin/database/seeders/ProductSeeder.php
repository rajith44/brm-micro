<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        File::ensureDirectoryExists(storage_path('app/public/products'));

        $shapes = ['Oval', 'Cushion', 'Round', 'Pear', 'Emerald'];
        $treatments = ['Unheated', 'Heated', 'Natural'];
        $variants = ['Premium', 'Collector Grade'];

        foreach (Category::orderBy('type')->orderBy('position')->get() as $ci => $category) {
            for ($n = 1; $n <= 2; $n++) {
                $carat = number_format(0.75 + (($ci * 3 + $n * 5) % 40) / 10, 2);
                $price = 420 + ((($ci * 53 + $n * 130) % 60) * 75);
                $name = $category->type === 'gemstone'
                    ? "{$carat}ct {$category->name} ({$variants[$n - 1]})"
                    : "{$category->name} — {$variants[$n - 1]}";

                $slug = Str::slug($name).'-'.$category->id;

                $product = Product::updateOrCreate(
                    ['slug' => $slug],
                    [
                        'type' => $category->type,
                        'category_id' => $category->id,
                        'name' => $name,
                        'sku' => 'SEED-'.strtoupper(Str::random(6)),
                        'price' => $price,
                        'short_detail' => $category->type === 'gemstone'
                            ? "{$treatments[$n % 3]} / {$shapes[$ci % 5]}"
                            : '18K Gold',
                        'description' => "A {$variants[$n - 1]} {$category->name} from the Prestige Gems collection, "
                            .'hand-selected and certified. This is sample seed data for demonstration.',
                        'attributes' => $this->attributesFor($category, $carat, $shapes[$ci % 5], $treatments[$n % 3]),
                        'is_published' => true,
                        'is_featured' => $n === 1,
                    ]
                );

                if ($product->images()->count() === 0) {
                    $this->attachImages($product, $category);
                }
            }
        }
    }

    private function attributesFor(Category $category, string $carat, string $shape, string $treatment): array
    {
        if ($category->type === 'gemstone') {
            return [
                'stone' => $category->name,
                'species' => 'Natural '.$category->name,
                'enhancement' => $treatment,
                'gem_weight' => "{$carat} ct",
                'gem_shape' => $shape,
                'gem_color' => 'Vivid',
                'gem_clarity' => 'Eye Clean',
                'gem_treatment' => $treatment,
                'gem_origin' => 'Ceylon, Sri Lanka',
                'gem_dimensions' => '7.2 x 5.8 x 3.9 mm',
                'gem_certification' => 'GIA / Included',
            ];
        }

        // jewelry — common fields
        $attrs = [
            'jw_metal' => '18K Yellow Gold',
            'jw_purity' => '18K',
            'jw_gross_weight' => '4.6 g',
            'jw_stone_type' => 'Blue Sapphire',
            'jw_stone_weight' => "{$carat} ct",
            'jw_size' => 'Adjustable',
            'jw_gender' => 'Ladies',
        ];

        if ($category->slug === 'rings') {
            $attrs += [
                'ring_size' => 'US 6.5',
                'ring_metal' => '18K White Gold',
                'shank_width' => '2.1 mm',
                'center_weight' => "{$carat} ct",
                'center_type' => 'Blue Sapphire',
                'center_shape' => $shape,
                'side_type' => 'Diamond',
                'side_number' => '12',
                'side_weight' => '0.36 ct',
                'side_color' => 'F-G',
                'side_clarity' => 'VS',
            ];
        } elseif ($category->slug === 'pendants') {
            $attrs += [
                'pendant_metal' => '18K Rose Gold',
                'pendant_length' => '22 mm',
                'pendant_width' => '12 mm',
                'stone_type' => 'Pink Sapphire',
                'stone_number' => '5',
                'stone_weight' => "{$carat} ct",
                'stone_shape' => $shape,
                'stone_color' => 'Pink',
                'stone_clarity' => 'VS',
            ];
        }

        return $attrs;
    }

    /**
     * Copy the category's source image into product storage as two dummy images.
     */
    private function attachImages(Product $product, Category $category): void
    {
        $source = $category->image ? public_path(ltrim($category->image, '/')) : null;
        if (! $source || ! File::exists($source)) {
            return;
        }

        $ext = pathinfo($source, PATHINFO_EXTENSION) ?: 'png';
        File::ensureDirectoryExists(public_path('uploads/products'));

        for ($i = 1; $i <= 2; $i++) {
            $name = "seed-{$product->id}-{$i}.{$ext}";
            File::copy($source, public_path("uploads/products/{$name}"));
            $product->images()->create([
                'path' => "/uploads/products/{$name}",
                'position' => $i - 1,
                'is_primary' => $i === 1,
            ]);
        }
    }
}
