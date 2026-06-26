import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog, getBlogs } from "@/lib/api";

export const dynamicParams = true;

export async function generateStaticParams() {
  if (process.env.STATIC_EXPORT !== "1") return [];
  const posts = await getBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const article = await getBlog(params.slug);
  if (!article) return { title: "Article not found — Prestige Gems" };
  return { title: `${article.title} — Prestige Gems`, description: article.excerpt };
}

export default async function ArticlePage({ params }) {
  const article = await getBlog(params.slug);
  if (!article) notFound();

  const more = (await getBlogs()).filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="max-w-3xl mx-auto px-4 lg:px-8 py-14">
        <nav className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-6">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span> / </span>
          <Link href="/blog" className="hover:text-gold">Blog</Link>
        </nav>

        <p className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-4">
          {article.date}{article.author ? ` · ${article.author}` : ""}
        </p>
        <h1 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-8">{article.title}</h1>
        {article.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.image} alt={article.title} className="rounded-[24px] w-full h-[360px] object-cover mb-10" />
        )}

        {article.body ? (
          <div
            className="prose-luxury max-w-none space-y-6 text-[17px] leading-8 text-[#43372a]
                       [&_h2]:font-cormorant [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-2
                       [&_p]:mb-5"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        ) : (
          <p className="text-xl text-ink">{article.excerpt}</p>
        )}
      </article>

      {more.length > 0 && (
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
      )}
    </>
  );
}
