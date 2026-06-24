import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getCategories } from "@/lib/api";

export const metadata = {
  title: "Gemstone Categories — Prestige Gems",
  description: "Browse our full range of certified Ceylon gemstone categories.",
};

export default async function GemstonesPage() {
  const categories = await getCategories("gemstone");
  const total = categories.reduce((sum, c) => sum + (c.count || 0), 0);

  return (
    <>
      <PageHero
        title="Gemstone Categories"
        crumb="Gemstones"
        subtitle="Explore our certified Ceylon gemstones by category. Choose a stone to view the full collection."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#6a5844]">
            <span className="font-semibold text-ink">{categories.length}</span> categories ·{" "}
            <span className="font-semibold text-ink">{total}</span> gemstones
          </p>
          <Link href="/gemstones/all" className="text-gold hover:text-gold-bright underline text-sm">
            View all gemstones →
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white border border-[#eee3d2] rounded-2xl p-12 text-center text-[#6a5844]">
            No categories available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/gemstones/${c.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#eee3d2] shadow-sm hover:shadow-mega transition-shadow"
              >
                <div className="relative bg-clay">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-coffee text-xs font-medium px-2.5 py-1 rounded-full">
                    {c.count} {c.count === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-cormorant text-xl">{c.name}</h3>
                  <p className="text-sm mt-1 text-[#6a5844] group-hover:text-gold transition-colors">
                    Shop {c.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
