"use client";

import { useState } from "react";
import Link from "next/link";

function CategoryList({
  categories,
  activeSlug,
  basePath,
  totalCount,
  allLabel,
  onNavigate,
}) {
  const item = (active) =>
    `flex items-center justify-between rounded-xl px-3 py-2 text-[15px] transition ${active ? "bg-coffee text-white" : "hover:bg-sand text-[#43372a]"
    }`;

  return (
    <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
      <li>
        <Link href={`${basePath}/all`} onClick={onNavigate} className={item(activeSlug === "all")}>
          <span>{allLabel}</span>
          <span className={`text-xs ${activeSlug === "all" ? "text-white/80" : "text-gold-muted"}`}>
            {totalCount}
          </span>
        </Link>
      </li>
      {categories.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <li key={c.slug}>
            <Link href={`${basePath}/${c.slug}`} onClick={onNavigate} className={item(active)}>
              <span className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-6 h-6 shrink-0 rounded-full bg-cover bg-center border border-[#d8c8b0]"
                  style={{ backgroundImage: `url('${c.image}')` }}
                />
                <span className="truncate">{c.name}</span>
              </span>
              <span className={`text-xs shrink-0 ml-2 ${active ? "text-white/80" : "text-gold-muted"}`}>
                {c.count}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function GemCategorySidebar({
  categories = [],
  activeSlug,
  basePath = "/gemstones",
  totalCount = 0,
  allLabel = "All Gemstones",
  title,
  resultCount = 0,
  empty = false,
  emptyMessage = "No items found in this category yet.",
  children,
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const listProps = {
    categories,
    activeSlug,
    basePath,
    totalCount,
    allLabel,
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-[#eee3d2] p-5 lg:sticky lg:top-28">
            <h2 className="font-cormorant text-2xl mb-1">Categories</h2>
            <p className="text-xs text-gold-muted uppercase tracking-[0.15em] mb-4">Filter by category</p>
            <CategoryList {...listProps} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* add buger menu button for mobile view */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 shrink-0 text-md text-gold underline underline-offset-4 hover:text-gold-bright mb-4"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            Show sidebar
          </button>
          <div className="flex items-center justify-between gap-4 mb-6">

            <h2 className="font-cormorant text-2xl min-w-0">
              {title}
              <span className="text-base text-[#6a5844] font-normal ml-2">
                ({resultCount} {resultCount === 1 ? "result" : "results"})
              </span>
            </h2>

          </div>

          {empty ? (
            <div className="bg-white border border-[#eee3d2] rounded-2xl p-12 text-center text-[#6a5844]">
              {emptyMessage}
            </div>
          ) : (
            children
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        onClick={close}
        aria-hidden={!open}
        className={`fixed inset-0 bg-black/40 transition-all duration-300 lg:hidden z-[100] ${open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
          }`}
      />

      {/* Mobile sidebar */}
      <aside
        aria-hidden={!open}
        className={`fixed top-0 left-0 h-full w-[88%] max-w-[360px] bg-cream shadow-2xl transition-transform duration-300 lg:hidden z-[110] overflow-y-auto ${open ? "translate-x-0" : "-translate-x-full pointer-events-none"
          }`}
      >
        <div className="sticky top-0 bg-cream border-b border-line px-4 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-cormorant text-xl">Categories</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-muted">Filter by category</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#d8c5a6]"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <CategoryList {...listProps} onNavigate={close} />
        </div>
      </aside>
    </>
  );
}
