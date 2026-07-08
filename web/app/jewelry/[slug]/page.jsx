import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import GemCategorySidebar from "@/components/GemCategorySidebar";
import { getCategories, getProducts } from "@/lib/api";

export const dynamicParams = true;

export async function generateStaticParams() {
  if (process.env.STATIC_EXPORT !== "1") return [];
  const categories = await getCategories("jewelry");
  return [{ slug: "all" }, ...categories.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }) {
  if (params.slug === "all") return { title: "All Jewelry — Prestige Gems" };
  const categories = await getCategories("jewelry");
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return { title: "Jewelry — Prestige Gems" };
  return {
    title: `${cat.name} — Prestige Gems`,
    description: `Shop handcrafted ${cat.name}.`,
  };
}

export default async function JewelryCategoryPage({ params }) {
  const { slug } = params;
  const isAll = slug === "all";

  const categories = await getCategories("jewelry");
  const cat = isAll ? null : categories.find((c) => c.slug === slug);
  if (!isAll && !cat) notFound();

  const products = await getProducts({
    type: "jewelry",
    category: isAll ? undefined : slug,
  });
  const total = categories.reduce((sum, c) => sum + (c.count || 0), 0);
  const title = isAll ? "All Jewelry" : cat.name;

  return (
    <>
      <PageHero
        title={title}
        crumb={
          <>
            <Link href="/jewelry" className="hover:text-gold">Jewelry</Link>
            {!isAll && <span> / {cat.name}</span>}
          </>
        }
        subtitle={
          isAll
            ? "Our complete collection of handcrafted gemstone jewelry."
            : `Handcrafted ${cat.name} set with exceptional Ceylon gemstones.`
        }
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <GemCategorySidebar
          categories={categories}
          activeSlug={isAll ? "all" : slug}
          basePath="/jewelry"
          totalCount={total}
          allLabel="All Jewelry"
          title={title}
          resultCount={products.length}
          empty={products.length === 0}
          emptyMessage="No jewelry found in this category yet."
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </GemCategorySidebar>
      </section>
    </>
  );
}
