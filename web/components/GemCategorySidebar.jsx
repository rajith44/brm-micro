import Link from "next/link";

// Presentational category filter sidebar. Data is passed in by the page.
export default function GemCategorySidebar({
  categories = [],
  activeSlug,
  basePath = "/gemstones",
  totalCount = 0,
  allLabel = "All Gemstones",
}) {
  const item = (active) =>
    `flex items-center justify-between rounded-xl px-3 py-2 text-[15px] transition ${
      active ? "bg-coffee text-white" : "hover:bg-sand text-[#43372a]"
    }`;

  return (
    <aside className="lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-[#eee3d2] p-5 lg:sticky lg:top-28">
        <h2 className="font-cormorant text-2xl mb-1">Categories</h2>
        <p className="text-xs text-gold-muted uppercase tracking-[0.15em] mb-4">Filter by category</p>

        <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          <li>
            <Link href={`${basePath}/all`} className={item(activeSlug === "all")}>
              <span>{allLabel}</span>
              <span className={`text-xs ${activeSlug === "all" ? "text-white/80" : "text-gold-muted"}`}>{totalCount}</span>
            </Link>
          </li>
          {categories.map((c) => {
            const active = c.slug === activeSlug;
            return (
              <li key={c.slug}>
                <Link href={`${basePath}/${c.slug}`} className={item(active)}>
                  <span className="flex items-center gap-2.5">
                    <span
                      className="w-6 h-6 shrink-0 rounded-full bg-cover bg-center border border-[#d8c8b0]"
                      style={{ backgroundImage: `url('${c.image}')` }}
                    />
                    {c.name}
                  </span>
                  <span className={`text-xs ${active ? "text-white/80" : "text-gold-muted"}`}>{c.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
