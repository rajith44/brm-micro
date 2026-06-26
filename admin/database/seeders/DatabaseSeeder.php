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

        // Default site settings.
        $settings = [
            'hide_price' => '0',
            'maintenance_mode' => '0',
            'maintenance_message' => 'We are currently performing scheduled maintenance. Please check back soon.',
            'business_name' => 'Micro Art LTD',
            'business_address' => '80, Burlington Road, New Malden KT3 4NU',
            'business_hours' => 'Mon – Sat: 9.00 AM – 6.00 PM',
            'business_tel' => '020 8412 0526',
            'business_mobile' => '07533 491025',
            'business_whatsapp' => '447533491025',
            'business_email' => 'Info@micro-art.co.uk',
            'social_facebook' => 'https://web.facebook.com/profile.php?id=61568132627000',
            'social_instagram' => 'https://www.instagram.com/microartltd',
            'social_twitter' => '',
            'social_youtube' => '',
            'social_tiktok' => '',
            'social_linkedin' => '',
            'social_pinterest' => '',
            'seo_title' => 'Micro Art LTD — Luxury Ceylon Gemstones & Jewelry',
            'seo_description' => 'Exceptional Ceylon gemstones, handcrafted jewelry and one-of-a-kind heirloom pieces. Certified, ethically sourced and crafted with master artistry.',
            'seo_keywords' => 'ceylon gemstones, blue sapphire, gemstone jewelry, micro art, new malden',
        ];
        foreach ($settings as $key => $value) {
            \App\Models\Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // Homepage hero slides
        $slides = [
            ['badge' => 'Ceylon Luxury Collection', 'title' => 'Rare sapphires crafted into timeless elegance.', 'text' => 'A premium storefront for exceptional gemstones, handcrafted jewelry and one-of-a-kind heirloom pieces inspired by Sri Lankan artistry.', 'primary_label' => 'Explore Collection', 'primary_link' => '/gemstones', 'secondary_label' => 'Book Consultation', 'secondary_link' => '/contact', 'image' => '/hero/1.jpg'],
            ['badge' => 'Bespoke Fine Jewelry', 'title' => 'Designed with passion. Perfected by craftsmanship.', 'text' => 'From ethically sourced gemstones to handcrafted settings, every detail is refined for luxury, meaning and beauty.', 'primary_label' => 'View Jewelry', 'primary_link' => '/jewelry', 'secondary_label' => 'Custom Design', 'secondary_link' => '/services', 'image' => '/hero/2.jpg'],
            ['badge' => 'Certified Ceylon Gemstones', 'title' => 'Discover treasures sourced from the heart of Sri Lanka.', 'text' => 'Premium blue sapphires, rubies and rare colored gemstones presented in a refined digital boutique experience.', 'primary_label' => 'Shop Gemstones', 'primary_link' => '/gemstones', 'secondary_label' => 'Visit Showroom', 'secondary_link' => '/contact', 'image' => '/hero/3.jpg'],
        ];
        foreach ($slides as $i => $s) {
            \App\Models\Slider::updateOrCreate(
                ['title' => $s['title']],
                $s + ['position' => $i, 'is_active' => true]
            );
        }

        // Homepage testimonials
        $testimonials = [
            ['quote' => 'Beautiful quality gemstones and a premium buying experience. The craftsmanship was truly outstanding from start to finish.', 'author' => 'Amara Fernando', 'location' => 'Singapore'],
            ['quote' => 'Excellent support and transparent gemstone certification details. I felt confident in every step of my purchase.', 'author' => 'James Whitfield', 'location' => 'London, UK'],
            ['quote' => 'The jewelry finish and presentation were exquisite. Delivery was smooth, secure and beautifully packaged.', 'author' => 'Priya Nair', 'location' => 'Dubai, UAE'],
            ['quote' => 'My custom sapphire ring exceeded every expectation. The team understood exactly what I wanted.', 'author' => 'Sofia Almeida', 'location' => 'Lisbon, Portugal'],
            ['quote' => 'Authentic Ceylon stones at a fair price, with certification you can trust. A truly world-class boutique.', 'author' => 'Daniel Cohen', 'location' => 'New York, USA'],
        ];
        foreach ($testimonials as $i => $t) {
            \App\Models\Testimonial::updateOrCreate(
                ['author' => $t['author'], 'quote' => $t['quote']],
                $t + ['rating' => 5, 'position' => $i, 'is_active' => true]
            );
        }
    }
}
