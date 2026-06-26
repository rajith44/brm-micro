import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import GemCategorySidebar from "@/components/GemCategorySidebar";
import { getCategories, getProducts } from "@/lib/api";

export const dynamicParams = true;

export async function generateStaticParams() {
  if (process.env.STATIC_EXPORT !== "1") return [];
  const categories = await getCategories("gemstone");
  return [{ slug: "all" }, ...categories.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }) {
  if (params.slug === "all") return { title: "All Gemstones — Prestige Gems" };
  const categories = await getCategories("gemstone");
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return { title: "Gemstones — Prestige Gems" };
  return {
    title: `${cat.name} — Prestige Gems`,
    description: `Shop certified Ceylon ${cat.name} gemstones.`,
  };
}

export default async function GemstoneCategoryPage({ params }) {
  const { slug } = params;
  const isAll = slug === "all";

  const categories = await getCategories("gemstone");
  const cat = isAll ? null : categories.find((c) => c.slug === slug);
  if (!isAll && !cat) notFound();

  const products = await getProducts({
    type: "gemstone",
    category: isAll ? undefined : slug,
  });
  const total = categories.reduce((sum, c) => sum + (c.count || 0), 0);
  const title = isAll ? "All Gemstones" : cat.name;

  return (
    <>
      <PageHero
        title={title}
        crumb={
          <>
            <Link href="/gemstones" className="hover:text-gold">Gemstones</Link>
            {!isAll && <span> / {cat.name}</span>}
          </>
        }
        subtitle={
          isAll
            ? "Our complete collection of certified Ceylon gemstones."
            : `Certified Ceylon ${cat.name}, hand-selected for colour, clarity and cut.`
        }
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row gap-8">
          <GemCategorySidebar
            categories={categories}
            activeSlug={isAll ? "all" : slug}
            basePath="/gemstones"
            totalCount={total}
            allLabel="All Gemstones"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-cormorant text-2xl">
                {title}
                <span className="text-base text-[#6a5844] font-normal ml-2">
                  ({products.length} {products.length === 1 ? "result" : "results"})
                </span>
              </h2>
            </div>

            {products.length === 0 ? (
              <div className="bg-white border border-[#eee3d2] rounded-2xl p-12 text-center text-[#6a5844]">
                No gemstones found in this category yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
