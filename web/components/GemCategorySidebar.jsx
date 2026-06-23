import Link from "next/link";
import { gemstoneCategoriesWithCount, gemstones } from "@/lib/data";

export default function GemCategorySidebar({ activeSlug }) {
  return (
    <aside className="lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-[#eee3d2] p-5 lg:sticky lg:top-28">
        <h2 className="font-cormorant text-2xl mb-1">Categories</h2>
        <p className="text-xs text-gold-muted uppercase tracking-[0.15em] mb-4">Filter gemstones</p>

        <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          <li>
            <Link
              href="/gemstones/all"
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-[15px] transition ${
                activeSlug === "all"
                  ? "bg-coffee text-white"
                  : "hover:bg-sand text-[#43372a]"
              }`}
            >
              <span>All Gemstones</span>
              <span className={`text-xs ${activeSlug === "all" ? "text-white/80" : "text-gold-muted"}`}>
                {gemstones.length}
              </span>
            </Link>
          </li>
          {gemstoneCategoriesWithCount.map((c) => {
            const active = c.slug === activeSlug;
            return (
              <li key={c.slug}>
                <Link
                  href={`/gemstones/${c.slug}`}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-[15px] transition ${
                    active ? "bg-coffee text-white" : "hover:bg-sand text-[#43372a]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="w-6 h-6 shrink-0 rounded-full bg-cover bg-center border border-[#d8c8b0]"
                      style={{ backgroundImage: `url('${c.image}')` }}
                    />
                    {c.name}
                  </span>
                  <span className={`text-xs ${active ? "text-white/80" : "text-gold-muted"}`}>
                    {c.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
