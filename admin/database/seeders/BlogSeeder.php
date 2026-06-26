<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        File::ensureDirectoryExists(storage_path('app/public/blogs'));

        $posts = [
            [
                'title' => 'Investing in Gemstones',
                'author' => 'Prestige Editorial',
                'image' => 'sapphire.png',
                'date' => '2026-06-12',
                'excerpt' => 'Learn how certified sapphires can become timeless heirlooms and collectible assets.',
            ],
            [
                'title' => 'Birthstones by Month',
                'author' => 'Prestige Editorial',
                'image' => 'rubies.png',
                'date' => '2026-05-28',
                'excerpt' => 'A curated guide to choosing the right gemstone for gifting and personal wear.',
            ],
            [
                'title' => 'Ceylon Blue Sapphire',
                'author' => 'Prestige Editorial',
                'image' => 'emerald.png',
                'date' => '2026-05-09',
                'excerpt' => "Discover why Sri Lankan sapphires remain among the world's most admired gemstones.",
            ],
            [
                'title' => 'Sapphire Categories Explained',
                'author' => 'Prestige Editorial',
                'image' => 'diamond.png',
                'date' => '2026-04-22',
                'excerpt' => 'From royal blue to fancy shades, understand the value and beauty of each type.',
            ],
        ];

        foreach ($posts as $post) {
            $slug = Str::slug($post['title']);

            $blog = Blog::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $post['title'],
                    'author' => $post['author'],
                    'excerpt' => $post['excerpt'],
                    'body' => $this->body($post['title'], $post['excerpt']),
                    'is_published' => true,
                    'published_at' => $post['date'],
                ]
            );

            if (! $blog->image) {
                $source = public_path('coloredGems/'.$post['image']);
                if (File::exists($source)) {
                    File::ensureDirectoryExists(public_path('uploads/blogs'));
                    $name = 'seed-'.$slug.'.png';
                    File::copy($source, public_path('uploads/blogs/'.$name));
                    $blog->update(['image' => '/uploads/blogs/'.$name]);
                }
            }
        }
    }

    private function body(string $title, string $excerpt): string
    {
        return <<<HTML
<p>{$excerpt}</p>
<p>Ceylon — modern-day Sri Lanka — has been celebrated for its gemstones for over two thousand years. The island's unique geology produces sapphires of exceptional clarity and colour, from the prized cornflower and royal blues to vivid yellows, pinks and the rare padparadscha.</p>
<h2>What makes Ceylon stones special</h2>
<p>Beyond their natural beauty, Ceylon gemstones are valued for their transparency, brilliance and the integrity of the local trade. Responsible sourcing and independent certification ensure every stone is exactly as represented.</p>
<h2>Caring for your gemstone</h2>
<p>Store your gemstones separately to avoid scratches, clean them gently with warm soapy water, and have settings checked periodically. With proper care, a fine Ceylon gemstone becomes a true heirloom — passed down across generations.</p>
HTML;
    }
}
