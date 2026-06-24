<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Page;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin login
        User::updateOrCreate(
            ['email' => 'admin@prestigegems.test'],
            ['name' => 'Micro Art LTD', 'password' => Hash::make('password')]
        );

        // Fixed static pages
        $pages = [
            ['key' => 'services', 'title' => 'Our Services', 'subtitle' => 'Full-service expertise in the world of fine gemstones.'],
            ['key' => 'education', 'title' => 'Education', 'subtitle' => 'Learn about Ceylon gemstones.'],
            ['key' => 'jewelry-class', 'title' => 'Jewelry Classes', 'subtitle' => 'Learn the art of jewelry making.'],
            ['key' => 'about-us', 'title' => 'About Us', 'subtitle' => 'Two decades of trust in Ceylon gemstones.'],
            ['key' => 'contact-us', 'title' => 'Contact Us', 'subtitle' => "We'd love to hear from you."],
        ];
        foreach ($pages as $p) {
            Page::updateOrCreate(['key' => $p['key']], $p + ['content' => '']);
        }

        // Gemstone subcategories
        $gemstones = [
            ['name' => 'Alexandrite', 'slug' => 'alexandrite', 'image' => '/coloredGems/alexandrite.png'],
            ['name' => 'Amethyst', 'slug' => 'amethyst', 'image' => '/coloredGems/amethyst.png'],
            ['name' => 'Aquamarine', 'slug' => 'aquamarine', 'image' => '/coloredGems/aquamarine.png'],
            ['name' => 'Citrine', 'slug' => 'citrine', 'image' => '/coloredGems/citrine.png'],
            ['name' => 'Coral', 'slug' => 'coral', 'image' => '/coloredGems/coral.png'],
            ['name' => 'Cubic Zirconia', 'slug' => 'cubic-zirconia', 'image' => '/coloredGems/cubic-zirconia.png'],
            ['name' => 'Diamond', 'slug' => 'diamond', 'image' => '/coloredGems/diamond.png'],
            ['name' => 'Emeralds', 'slug' => 'emerald', 'image' => '/coloredGems/emerald.png'],
            ['name' => 'Fire Opal', 'slug' => 'fire-opal', 'image' => '/coloredGems/fire-opal.png'],
            ['name' => 'Garnet', 'slug' => 'garnet', 'image' => '/coloredGems/garnet.png'],
            ['name' => 'Jade', 'slug' => 'jade', 'image' => '/coloredGems/jade.png'],
            ['name' => 'Moonstone', 'slug' => 'moonstone', 'image' => '/coloredGems/moonstone.png'],
            ['name' => 'Morganite', 'slug' => 'morganite', 'image' => '/coloredGems/morganite.png'],
            ['name' => 'Mother of pearl', 'slug' => 'mother-of-pearl', 'image' => '/coloredGems/mother-of-pearl.png'],
            ['name' => 'Onyx', 'slug' => 'onyx', 'image' => '/coloredGems/onyx.png'],
            ['name' => 'Opal', 'slug' => 'opal', 'image' => '/coloredGems/opal.png'],
            ['name' => 'Pearls', 'slug' => 'pearls', 'image' => '/coloredGems/pearls.png'],
            ['name' => 'Peridot', 'slug' => 'peridot', 'image' => '/coloredGems/peridot.png'],
            ['name' => 'Rubies', 'slug' => 'rubies', 'image' => '/coloredGems/rubies.png'],
            ['name' => 'Sapphire', 'slug' => 'sapphire', 'image' => '/coloredGems/sapphire.png'],
            ['name' => 'Spinel', 'slug' => 'spinel', 'image' => '/coloredGems/spinel.png'],
            ['name' => 'Tanzanite', 'slug' => 'tanzanite', 'image' => '/coloredGems/tanzanite.png'],
            ['name' => 'Topaz', 'slug' => 'topaz', 'image' => '/coloredGems/topaz.png'],
            ['name' => 'Tourmaline', 'slug' => 'tourmaline', 'image' => '/coloredGems/tourmaline.png'],
            ['name' => 'Turquoise', 'slug' => 'turquoise', 'image' => '/coloredGems/turquoise.png'],
        ];

        // Jewelry subcategories
        $jewelry = [
            ['name' => 'Pathakam', 'slug' => 'pathakam', 'image' => '/jewelry/pathakam.png'],
            ['name' => 'Wedding band', 'slug' => 'wedding-band', 'image' => '/jewelry/wedding-band.jpg'],
            ['name' => 'Rings', 'slug' => 'rings', 'image' => '/jewelry/rings.png'],
            ['name' => 'Necklace', 'slug' => 'necklace', 'image' => '/jewelry/necklace.jpg'],
            ['name' => 'Pendants', 'slug' => 'pendants', 'image' => '/jewelry/pendants.png'],
            ['name' => 'Bangle', 'slug' => 'bangle', 'image' => '/jewelry/bangle.png'],
            ['name' => 'Earrings', 'slug' => 'earrings', 'image' => '/jewelry/earrings.png'],
        ];

        foreach ($gemstones as $i => $cat) {
            Category::updateOrCreate(
                ['slug' => $cat['slug']],
                ['type' => 'gemstone', 'name' => $cat['name'], 'image' => $cat['image'], 'position' => $i, 'is_active' => true]
            );
        }
        foreach ($jewelry as $i => $cat) {
            Category::updateOrCreate(
                ['slug' => $cat['slug']],
                ['type' => 'jewelry', 'name' => $cat['name'], 'image' => $cat['image'], 'position' => $i, 'is_active' => true]
            );
        }

        // Two demo products (with images) per category.
        $this->call(ProductSeeder::class);

        // Demo blog posts.
        $this->call(BlogSeeder::class);
    }
}
