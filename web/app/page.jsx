import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ArticlesCarousel from "@/components/ArticlesCarousel";
import TrustBadges from "@/components/TrustBadges";
import ColoredGemstonesCarousel from "@/components/ColoredGemstonesCarousel";
import JewelryCategoriesCarousel from "@/components/JewelryCategoriesCarousel";
import { getCategories, getProducts, getBlogs, getSliders, getTestimonials } from "@/lib/api";

const igImages = Array.from({ length: 10 }, (_, i) =>
  `https://placehold.co/300x300?text=IG+${i + 1}`
);

// In-house workshop services highlighted on the home page.
const workshopHighlights = [
  {
    label: "Repairs & Restoration",
    title: "Jewellery Repair",
    text: "Bring a treasured piece back to life. Resizing, soldering, reshaping and polishing — carried out in-house and fully guaranteed.",
    points: [
      "Ring resizing from £30 — polish included",
      "Chain soldering & repair from £40",
      "Most repairs done in 2–12 working days",
    ],
    from: "£20",
    img: "/images/repair.png",
    href: "/services",
    cta: "View Services & Prices",
  },
  {
    label: "Learn The Craft",
    title: "Jewelry Making Classes",
    text: "Make your own piece from scratch. Hands-on training at our workshop for beginners, hobbyists and working professionals alike.",
    points: [
      "2-hour and 3-hour sessions",
      "Private lessons available on request",
      "Morning & afternoon slots — flexible hours",
    ],
    from: "£22",
    img: "/images/classes.png",
    href: "/jewelry-classes",
    cta: "Explore Classes",
  },
];

export default async function Home() {
  const [gemCategories, jewelryCategories, gemstones, jewelry, articles, slides, testimonials] = await Promise.all([
    getCategories("gemstone"),
    getCategories("jewelry"),
    getProducts({ type: "gemstone", limit: 10 }),
    getProducts({ type: "jewelry", limit: 5 }),
    getBlogs(4),
    getSliders(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSlider slides={slides} />

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-10 relative z-20">
        <TrustBadges />
      </section>

      {/* Colored gemstones */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <SectionHeading title="Colored Gemstones" subtitle="Exquisite stones from the heart of Ceylon." />
        <ColoredGemstonesCarousel items={gemCategories} />
      </section>

      {/* Workshop services highlight — Repair & Classes */}
      <section className="bg-clay mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-muted">At Our Workshop</span>
            <h2 className="font-cormorant text-4xl lg:text-5xl mt-3 mb-4">More than a jewellery store</h2>
            <p className="text-[#6a5844] leading-8">
              Repair a piece you love, or learn to make one yourself — both handled
              in-house by our master craftsmen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {workshopHighlights.map((c) => (
              <div key={c.title} className="group bg-white text-ink rounded-[28px] overflow-hidden flex flex-col">
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-5 left-5 text-[11px] uppercase tracking-[0.22em] bg-cream/95 backdrop-blur text-coffee px-4 py-2 rounded-full">
                    {c.label}
                  </span>
                  <span className="absolute bottom-5 right-5 bg-gold text-white rounded-2xl px-5 py-2 text-center shadow-lg">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-white/80">From</span>
                    <span className="font-cormorant text-2xl leading-none">{c.from}</span>
                  </span>
                </div>

                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <h3 className="font-cormorant text-3xl mb-3">{c.title}</h3>
                  <p className="text-[#6a5844] leading-8 mb-6">{c.text}</p>

                  <ul className="space-y-2.5 mb-8">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px] text-[#43372a]">
                        <span className="text-gold mt-0.5">✦</span> {p}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={c.href}
                    className="mt-auto inline-flex w-fit items-center gap-2 bg-coffee text-white px-7 py-3 rounded-full font-medium hover:bg-gold transition-colors"
                  >
                    {c.cta}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review / trust section */}
      <section className="bg-sand/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="images/gems.jpg" alt="Ceylon sapphire story" className="rounded-[24px] w-full h-[420px] object-cover" />
              <div className="absolute -bottom-6 -right-3 lg:right-6 bg-white rounded-2xl px-6 py-5 border border-[#eee3d2] shadow-mega text-center">
                <div className="font-cormorant text-4xl text-gold leading-none">4.9</div>
                <div className="text-gold-light text-sm mt-1">★★★★★</div>
                <div className="text-[11px] text-[#6a5844] mt-1 uppercase tracking-[0.12em]">Verified reviews</div>
              </div>
            </div>
            <div className="min-w-0">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-muted">Loved Worldwide</span>
              <h2 className="font-cormorant text-4xl lg:text-5xl leading-tight mt-3 mb-6">
                Globally trusted for Ceylon Sapphires.
              </h2>
              <p className="text-[#6a5844] leading-8">
                For over two decades, Prestige Gems has connected collectors and
                jewelry lovers with the finest certified Ceylon gemstones, backed
                by transparent sourcing and master craftsmanship.
              </p>
              <ReviewsCarousel items={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* Gemstone jewelry categories */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <SectionHeading title="Gemstone Jewelry" subtitle="Crafted with exceptional stones and refined artistry." />
        <JewelryCategoriesCarousel items={jewelryCategories} />
      </section>

      {/* Gemstone collection grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <SectionHeading title="Gemstones Collection" subtitle="Premium sapphires, rubies and collector-grade stones." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {gemstones.map((g) => (
            <ProductCard key={g.id} product={g} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/gemstones" className="inline-block bg-coffee text-white px-7 py-3 rounded-full">
            Browse All Categories
          </Link>
        </div>
      </section>

      {/* Large editorial banner */}
      <section className="w-full mx-auto">
        <div className="grid lg:grid-cols-5 bg-sand overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="images/luxury-model-jewelry.jpg" alt="Luxury craftsmanship" className="col-span-2 w-full h-full min-h-[420px] object-cover" />
          <div className="col-span-3 p-10 lg:p-16 flex items-center">
            <div>
              <h2 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-6">Crafted by time. Perfected by passion.</h2>
              <p className="text-[#6a5844] leading-8 mb-8">
                Every Prestige Gems creation begins with a rare stone and ends
                with a heirloom — shaped by master cutters and bespoke design.
              </p>
              <div className="flex gap-4">
                <Link href="/jewelry" className="bg-coffee text-white px-6 py-3 rounded-full">View Collection</Link>
                <Link href="/about" className="border border-[#bfa272] px-6 py-3 rounded-full text-[#7b5d2d]">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Home of ceylon sapphires + 3 cards */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 bg-sand rounded-[24px] p-8 lg:p-10">
            <h2 className="font-cormorant text-4xl mb-5">Home of Ceylon Sapphires</h2>
            <p className="text-[#6a5844] leading-8">
              Rooted in Sri Lanka&apos;s legendary gem trade, Prestige Gems brings
              heritage, authenticity and luxury positioning to every piece we
              source and craft.
            </p>
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-3 gap-5">
            {[
              { t: "Our Craftsmanship", d: "Fine cutting, setting and finishing.", img: "CuttingSapphire" },
              { t: "Our Gemstones", d: "Collector-grade Ceylon stones.", img: "Gemstones" },
              { t: "Our Jewelry", d: "Bespoke luxury creations.", img: "FineJewelry" },
            ].map((c) => (
              <div key={c.t} className="bg-clay rounded-[24px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`images/${c.img}.png`} alt={c.t} className="w-full h-80 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="font-cormorant text-2xl">{c.t}</h3>
                  <p className="text-sm mt-2 text-[#6a5844]">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jewelry collection */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <SectionHeading title="Jewelry Collection" subtitle="Elegant, handcrafted pieces for every occasion." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {jewelry.map((j) => (
            <ProductCard key={j.id} product={j} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/jewelry" className="inline-block bg-coffee text-white px-7 py-3 rounded-full">
            Browse All Jewelry
          </Link>
        </div>
      </section>



      {/* Visit store + workshop */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <SectionHeading
          title="Experience Prestige Gems"
          subtitle="Step into our showroom or behind the scenes of our atelier."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Showroom",
              title: "Visit our store",
              text: "Experience our gemstones in person at our Colombo showroom. Book a private viewing with our gemologists.",
              img: "images/our-store.png",
              cta: { href: "/contact", label: "Locate Store" },
            },
            {
              label: "Atelier",
              title: "Our Workshop",
              text: "Our in-house artisans handle every step — cutting, setting and finishing — alongside bespoke custom design.",
              img: "images/workshop.png",
              cta: { href: "/services", label: "View Workshop" },
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-[28px] min-h-[460px] lg:min-h-[520px] shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10 text-white">
                <span className="text-xs uppercase tracking-[0.3em] text-gold-light mb-3">
                  {card.label}
                </span>
                <h3 className="font-cormorant text-3xl lg:text-4xl mb-3">{card.title}</h3>
                <p className="text-white/85 leading-7 mb-7 max-w-md">{card.text}</p>
                <Link
                  href={card.cta.href}
                  className="inline-flex w-fit items-center gap-2 bg-white text-coffee px-6 py-3 rounded-full font-medium hover:bg-gold-light hover:text-white transition-colors"
                >
                  {card.cta.label}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <SectionHeading title="Be Aware of All Events" subtitle="Editorial articles, education and gemstone insights." />
        <ArticlesCarousel articles={articles} />
      </section>

      {/* Instagram */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <SectionHeading title="Follow Our Journey" subtitle="A gallery strip of our latest gemstones and jewelry." />
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {igImages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt={`Instagram ${i + 1}`} className="rounded-2xl w-full aspect-square object-cover" />
          ))}
        </div>
      </section>
    </>
  );
}
