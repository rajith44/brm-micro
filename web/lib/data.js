// Central content store for the storefront. Swap placeholder images for real
// product photography without touching the components.

const img = (w, h, text) =>
  `https://placehold.co/${w}x${h}?text=${encodeURIComponent(text)}`;

export const coloredGemstones = [
  { name: "Alexandrite", slug: "alexandrite", image: "/coloredGems/alexandrite.png" },
  { name: "Amethyst", slug: "amethyst", image: "/coloredGems/amethyst.png" },
  { name: "Aquamarine", slug: "aquamarine", image: "/coloredGems/aquamarine.png" },
  { name: "Citrine", slug: "citrine", image: "/coloredGems/citrine.png" },
  { name: "Coral", slug: "coral", image: "/coloredGems/coral.png" },
  { name: "Cubic Zirconia", slug: "cubic-zirconia", image: "/coloredGems/cubic-zirconia.png" },
  { name: "Diamond", slug: "diamond", image: "/coloredGems/diamond.png" },
  { name: "Emeralds", slug: "emerald", image: "/coloredGems/emerald.png" },
  { name: "Fire Opal", slug: "fire-opal", image: "/coloredGems/fire-opal.png" },
  { name: "Garnet", slug: "garnet", image: "/coloredGems/garnet.png" },
  { name: "Jade", slug: "jade", image: "/coloredGems/jade.png" },
  { name: "Moonstone", slug: "moonstone", image: "/coloredGems/moonstone.png" },
  { name: "Morganite", slug: "morganite", image: "/coloredGems/morganite.png" },
  { name: "Mother of pearl", slug: "mother-of-pearl", image: "/coloredGems/mother-of-pearl.png" },
  { name: "Onyx", slug: "onyx", image: "/coloredGems/onyx.png" },
  { name: "Opal", slug: "opal", image: "/coloredGems/opal.png" },
  { name: "Pearls", slug: "pearls", image: "/coloredGems/pearls.png" },
  { name: "Peridot", slug: "peridot", image: "/coloredGems/peridot.png" },
  { name: "Rubies", slug: "rubies", image: "/coloredGems/rubies.png" },
  { name: "Sapphire", slug: "sapphire", image: "/coloredGems/sapphire.png" },
  { name: "Spinel", slug: "spinel", image: "/coloredGems/spinel.png" },
  { name: "Tanzanite", slug: "tanzanite", image: "/coloredGems/tanzanite.png" },
  { name: "Topaz", slug: "topaz", image: "/coloredGems/topaz.png" },
  { name: "Tourmaline", slug: "tourmaline", image: "/coloredGems/tourmaline.png" },
  { name: "Turquoise", slug: "turquoise", image: "/coloredGems/turquoise.png" },
];

export const jewelryCategories = [
  { name: "Pathakam", slug: "pathakam", image: "/jewelry/pathakam.png" },
  { name: "Wedding band", slug: "wedding-band", image: "/jewelry/wedding-band.jpg" },
  { name: "Rings", slug: "rings", image: "/jewelry/rings.png" },
  { name: "Necklace", slug: "necklace", image: "/jewelry/necklace.jpg" },
  { name: "Pendants", slug: "pendants", image: "/jewelry/pendants.png" },
  { name: "Bangle", slug: "bangle", image: "/jewelry/bangle.png" },
  { name: "Earrings", slug: "earrings", image: "/jewelry/earrings.png" }
];

// The 25 colored gemstones double as shop categories.
export const gemstoneCategories = coloredGemstones;

const CUTS = ["Cushion", "Oval", "Round", "Pear", "Emerald", "Princess", "Marquise"];
const TREATMENTS = ["Unheated", "Heated", "Natural", "Certified"];

// Deterministically generate a catalog of products spread across every
// gemstone category, so each category has a real product count.
function buildGemstones() {
  const out = [];
  gemstoneCategories.forEach((cat, ci) => {
    const count = 5 + ((ci * 4 + 3) % 8); // 5..12, stable per category
    for (let i = 0; i < count; i++) {
      const carat = (0.75 + (((i * 7 + ci * 5) % 45) / 10)).toFixed(2);
      const price = 380 + (((i * 137 + ci * 271) % 48) * 65);
      out.push({
        id: `${cat.slug}-${i + 1}`,
        name: `${carat}ct ${cat.name}`,
        detail: `${TREATMENTS[(i + ci) % TREATMENTS.length]} / ${CUTS[(i * 2 + ci) % CUTS.length]}`,
        price,
        category: cat.name,
        categorySlug: cat.slug,
        image: cat.image,
      });
    }
  });
  return out;
}

export const gemstones = buildGemstones();

// Featured subset for the homepage collection strip.
export const featuredGemstones = gemstones.slice(0, 10);

export function getGemCategory(slug) {
  return gemstoneCategories.find((c) => c.slug === slug);
}

export function getGemstonesByCategory(slug) {
  return gemstones.filter((g) => g.categorySlug === slug);
}

// [{ ...category, count }] for category landing + sidebar filters.
export const gemstoneCategoriesWithCount = gemstoneCategories.map((c) => ({
  ...c,
  count: gemstones.filter((g) => g.categorySlug === c.slug).length,
}));

export const jewelry = [
  { id: "jw-01", name: "Blue Sapphire Ring", detail: "18K White Gold", price: 1450, category: "Rings", image: img(600, 480, "Jewelry 01") },
  { id: "jw-02", name: "Emerald Ring", detail: "18K Gold", price: 1320, category: "Rings", image: img(600, 480, "Jewelry 02") },
  { id: "jw-03", name: "Pink Sapphire Ring", detail: "14K Gold", price: 1180, category: "Rings", image: img(600, 480, "Jewelry 03") },
  { id: "jw-04", name: "Diamond Earrings", detail: "Classic Studs", price: 980, category: "Earrings", image: img(600, 480, "Jewelry 04") },
  { id: "jw-05", name: "Ruby Ring", detail: "18K Rose Gold", price: 1590, category: "Rings", image: img(600, 480, "Jewelry 05") },
  { id: "jw-06", name: "Sapphire Pendant", detail: "18K Gold Chain", price: 1240, category: "Pendants", image: img(600, 480, "Jewelry 06") },
  { id: "jw-07", name: "Tennis Bracelet", detail: "White Gold", price: 2100, category: "Bracelets", image: img(600, 480, "Jewelry 07") },
  { id: "jw-08", name: "Padparadscha Pendant", detail: "Rose Gold", price: 2650, category: "Pendants", image: img(600, 480, "Jewelry 08") },
];

// Unified product lookup used by /products/[slug]
export const allProducts = [
  ...gemstones.map((g) => ({ ...g, type: "gemstone" })),
  ...jewelry.map((j) => ({ ...j, type: "jewelry" })),
];

export function getProduct(id) {
  return allProducts.find((p) => p.id === id);
}

export const articles = [
  {
    slug: "investing-in-gemstones",
    title: "Investing in Gemstones",
    excerpt: "Learn how certified sapphires can become timeless heirlooms and collectible assets.",
    image: img(700, 450, "Article 01"),
    date: "June 12, 2026",
    author: "Prestige Editorial",
  },
  {
    slug: "birthstones-by-month",
    title: "Birthstones by Month",
    excerpt: "A curated guide to choosing the right gemstone for gifting and personal wear.",
    image: img(700, 450, "Article 02"),
    date: "May 28, 2026",
    author: "Prestige Editorial",
  },
  {
    slug: "ceylon-blue-sapphire",
    title: "Ceylon Blue Sapphire",
    excerpt: "Discover why Sri Lankan sapphires remain among the world's most admired gemstones.",
    image: img(700, 450, "Article 03"),
    date: "May 09, 2026",
    author: "Prestige Editorial",
  },
  {
    slug: "sapphire-categories",
    title: "Sapphire Categories",
    excerpt: "From royal blue to fancy shades, understand the value and beauty of each type.",
    image: img(700, 450, "Article 04"),
    date: "April 22, 2026",
    author: "Prestige Editorial",
  },
];

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug);
}

export const trustBadges = [
  { icon: "✦", title: "25 Years of Trust", text: "Luxury, legacy and craftsmanship." },
  { icon: "◆", title: "Certified Gemstones", text: "Authentic Ceylon stones with certification." },
  { icon: "◎", title: "Worldwide Shipping", text: "Secure global delivery for all orders." },
  { icon: "✺", title: "Direct From Mines", text: "Sourced responsibly from Sri Lanka." },
];

export const reviews = [
  { text: "Beautiful quality gemstones and a premium buying experience. The craftsmanship was truly outstanding from start to finish.", author: "Amara Fernando", location: "Singapore" },
  { text: "Excellent support and transparent gemstone certification details. I felt confident in every step of my purchase.", author: "James Whitfield", location: "London, UK" },
  { text: "The jewelry finish and presentation were exquisite. Delivery was smooth, secure and beautifully packaged.", author: "Priya Nair", location: "Dubai, UAE" },
  { text: "My custom sapphire ring exceeded every expectation. The team understood exactly what I wanted.", author: "Sofia Almeida", location: "Lisbon, Portugal" },
  { text: "Authentic Ceylon stones at a fair price, with certification you can trust. A truly world-class boutique.", author: "Daniel Cohen", location: "New York, USA" },
];

export const heroSlides = [
  {
    badge: "Ceylon Luxury Collection",
    title: "Rare sapphires crafted into timeless elegance.",
    text: "A premium storefront for exceptional gemstones, handcrafted jewelry and one-of-a-kind heirloom pieces inspired by Sri Lankan artistry.",
    primary: { label: "Explore Collection", href: "/gemstones" },
    secondary: { label: "Book Consultation", href: "/contact" },
    image: "hero/1.jpg",
  },
  {
    badge: "Bespoke Fine Jewelry",
    title: "Designed with passion. Perfected by craftsmanship.",
    text: "From ethically sourced gemstones to handcrafted settings, every detail is refined for luxury, meaning and beauty.",
    primary: { label: "View Jewelry", href: "/jewelry" },
    secondary: { label: "Custom Design", href: "/services" },
    image: "hero/2.jpg",
  },
  {
    badge: "Certified Ceylon Gemstones",
    title: "Discover treasures sourced from the heart of Sri Lanka.",
    text: "Premium blue sapphires, rubies and rare colored gemstones presented in a refined digital boutique experience.",
    primary: { label: "Shop Gemstones", href: "/gemstones" },
    secondary: { label: "Visit Showroom", href: "/contact" },
    image: "hero/3.jpg",
  },
];

export const navData = {
  precious: ["Blue Sapphire", "Pink Sapphire", "Yellow Sapphire", "Padparadscha Sapphire", "Green Sapphire", "White Sapphire"],
  semiPrecious: ["Amethyst", "Peridot", "Moonstone", "Garnet", "Aquamarine", "Spinel"],
  jewelry: [
    { name: "Ladies Rings", image: "menu/ladies-rings.png" },
    { name: "Pendants", image: "menu/pendants.png" },
    { name: "Earrings", image: "menu/earrings.png" },
    { name: "Gent's Rings", image: "menu/gents-rings.png" },
    { name: "Bracelet", image: "menu/bracelet.png" },
    { name: "Necklace", image: "menu/necklace.webp" },
    { name: "Pathakam", image: "menu/pathakam.webp" },
    { name: "Wedding band", image: "menu/wedding-band.jpg" }, ,
  ],
  education: [
    "Sri Lankan Gem Industry",
    "Main Species of Gemstones Found in Sri Lanka",
    "How to Buy Best Quality Gemstones",
    "Gemstone Treatments",
  ],
};
