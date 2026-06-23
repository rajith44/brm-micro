import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return { title: "Article not found — Prestige Gems" };
  return { title: `${article.title} — Prestige Gems`, description: article.excerpt };
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="max-w-3xl mx-auto px-4 lg:px-8 py-14">
        <nav className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span> / </span>
          <Link href="/blog" className="hover:text-gold">Blog</Link>
        </nav>

        <p className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-4">{article.date} · {article.author}</p>
        <h1 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-8">{article.title}</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image.replace("700x450", "1200x700")} alt={article.title} className="rounded-[24px] w-full h-[360px] object-cover mb-10" />

        <div className="prose-luxury space-y-6 text-[17px] leading-8 text-[#43372a]">
          <p className="text-xl text-ink">{article.excerpt}</p>
          <p>
            Ceylon — modern-day Sri Lanka — has been celebrated for its gemstones
            for over two thousand years. The island&apos;s unique geology produces
            sapphires of exceptional clarity and color, from the prized cornflower
            and royal blues to vivid yellows, pinks and the rare padparadscha.
          </p>
          <h2 className="font-cormorant text-2xl text-ink">What makes Ceylon stones special</h2>
          <p>
            Beyond their natural beauty, Ceylon sapphires are valued for their
            transparency, brilliance and the integrity of the local trade.
            Responsible sourcing and independent certification ensure every stone
            is exactly as represented — a cornerstone of how we work at Prestige
            Gems.
          </p>
          <p>
            Whether you are buying your first certified sapphire or adding a
            collector-grade piece to an existing collection, understanding origin,
            treatment and grading helps you make a confident, lasting investment.
          </p>
          <h2 className="font-cormorant text-2xl text-ink">Caring for your gemstone</h2>
          <p>
            Store your gemstones separately to avoid scratches, clean them gently
            with warm soapy water, and have settings checked periodically. With
            proper care, a fine Ceylon sapphire becomes a true heirloom — passed
            down across generations.
          </p>
        </div>
      </article>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 border-t border-line">
        <h2 className="font-cormorant text-3xl mb-8">More articles</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {more.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eee3d2] block group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.image} alt={a.title} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-5">
                <h3 className="font-cormorant text-xl leading-tight">{a.title}</h3>
                <p className="text-sm text-[#6a5844] mt-2">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
