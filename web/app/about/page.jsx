import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { trustBadges } from "@/lib/data";

export const metadata = {
  title: "About Us — Prestige Gems",
  description: "Our heritage, sourcing story and the luxury positioning of Prestige Gems.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Prestige Gems"
        crumb="About Us"
        subtitle="Two decades of trust in the world of Ceylon gemstones — heritage, authenticity and master craftsmanship."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/900x600?text=Our+Story" alt="Our story" className="rounded-[24px] w-full h-[420px] object-cover" />
          <div>
            <h2 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-6">Rooted in Sri Lanka&apos;s legendary gem trade.</h2>
            <p className="text-[#6a5844] leading-8 mb-5">
              From the mines of Ratnapura to collectors around the world, Prestige
              Gems has built a reputation for exceptional Ceylon sapphires,
              transparent certification and refined, handcrafted jewelry.
            </p>
            <p className="text-[#6a5844] leading-8">
              Every stone is hand-selected by our gemologists and every piece is
              finished in our in-house workshop, ensuring uncompromising quality
              and timeless beauty.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <SectionHeading title="Why Choose Us" subtitle="The values behind every Prestige Gems creation." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustBadges.map((b) => (
            <div key={b.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#eee3d2]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f3eadb] flex items-center justify-center text-gold text-xl">{b.icon}</div>
              <h3 className="font-cormorant text-xl mb-2">{b.title}</h3>
              <p className="text-sm text-[#6a5844]">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "25+", l: "Years of Trust" },
            { n: "10k+", l: "Happy Clients" },
            { n: "100%", l: "Certified Stones" },
            { n: "40+", l: "Countries Shipped" },
          ].map((s) => (
            <div key={s.l} className="bg-sand rounded-[24px] py-10">
              <div className="font-cormorant text-4xl lg:text-5xl text-gold">{s.n}</div>
              <div className="text-sm text-[#6a5844] mt-2 uppercase tracking-[0.12em]">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="bg-coffee text-white rounded-[24px] p-10 lg:p-16 text-center">
          <h2 className="font-cormorant text-3xl lg:text-4xl mb-4">Ready to find your perfect gemstone?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">Book a private consultation with our gemologists or browse our certified collection.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/gemstones" className="bg-white text-coffee px-7 py-3 rounded-full font-medium">Shop Gemstones</Link>
            <Link href="/contact" className="border border-white/60 px-7 py-3 rounded-full font-medium">Book Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
