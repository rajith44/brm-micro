import Link from "next/link";
import PageHero from "@/components/PageHero";
import { articles } from "@/lib/data";

export const metadata = {
  title: "Blog & Education — Prestige Gems",
  description: "Editorial articles, gemstone education and Ceylon sapphire insights.",
};

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero
        title="Blog & Education"
        crumb="Blog"
        subtitle="Editorial articles, gemstone education and insights from the heart of Ceylon."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {/* Featured */}
        <Link href={`/blog/${featured.slug}`} className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-[24px] overflow-hidden border border-[#eee3d2] shadow-sm group mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.image} alt={featured.title} className="w-full h-full min-h-[300px] object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="p-8 lg:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-3">{featured.date} · {featured.author}</p>
            <h2 className="font-cormorant text-3xl lg:text-4xl leading-tight mb-4">{featured.title}</h2>
            <p className="text-[#6a5844] leading-8 mb-6">{featured.excerpt}</p>
            <span className="text-gold underline">Read article</span>
          </div>
        </Link>

        <div className="grid md:grid-cols-3 gap-5">
          {rest.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eee3d2] block group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.image} alt={a.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gold-muted mb-2">{a.date}</p>
                <h3 className="font-cormorant text-2xl leading-tight">{a.title}</h3>
                <p className="text-sm text-[#6a5844] mt-3">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
