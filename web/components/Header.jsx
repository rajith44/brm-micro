"use client";

import Link from "next/link";
import { useState } from "react";
import { navData, coloredGemstones } from "@/lib/data";

const Chevron = () => (
  <svg className="w-3 h-3 mt-[1px]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Header({ gemCategories = [], jewelryCategories = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Fall back to bundled data if the API is unavailable.
  const gems = gemCategories.length ? gemCategories : coloredGemstones;
  const jewels = jewelryCategories.length ? jewelryCategories : navData.jewelry;

  const toggleAccordion = (key) =>
    setOpenAccordion((cur) => (cur === key ? null : key));

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenAccordion(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#d8c5a6] text-ink"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        {/* Desktop left nav */}
        <nav className="hidden lg:flex items-center gap-8 uppercase tracking-[0.06em] text-[18px] leading-[1.2]">
          {/* Gemstones mega */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-gold py-3 text-uppercase">
              GEMSTONES <Chevron />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
              <div className="w-[860px] bg-[#f5f1ea] border border-[#e4d6bf] shadow-mega">
                <div className="p-8">
                  <h3 className="text-gold-bright font-semibold tracking-[0.12em] text-[15px] mb-6">Ceylon Gemstones</h3>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-[15px] tracking-[0.04em] text-[#43372a] normal-case">
                    {gems.map((g) => (
                      <Link key={g.slug} href={`/gemstones/${g.slug}`} className="flex items-center gap-3 hover:text-gold-bright">
                        <span className="w-8 h-8 shrink-0 rounded-full bg-cover bg-center border border-[#d8c8b0]" style={{ backgroundImage: `url('${g.image}')` }} />
                        {g.name}
                      </Link>
                    ))}
                  </div>
                  <Link href="/gemstones" className="inline-block mt-8 text-[15px] tracking-[0.12em] text-[#43372a] hover:text-gold-bright">View all gemstones</Link>
                </div>
                <div className="h-1 bg-gold-bright w-full" />
              </div>
            </div>
          </div>

          {/* Jewelry mega */}
          <div className="relative group">
            <Link href="/jewelry" className="flex items-center gap-2 hover:text-gold py-3">
              JEWELRY <Chevron />
            </Link>
            <div className="absolute left-[-120px] top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
              <div className="w-[820px] bg-[#f5f1ea] border border-[#e4d6bf] shadow-mega">
                <div className="grid grid-cols-5 gap-6 px-8 py-8">
                  {jewels.map((j) => (
                    <Link key={j.slug ?? j.name} href={j.slug ? `/jewelry/${j.slug}` : "/jewelry"} className="text-center group/item">
                      <div className="h-28 flex items-center justify-center mb-4 bg-white rounded-2xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={j.image} alt={j.name} className="max-h-24 w-full object-cover transition-transform duration-300 group-hover/item:scale-105" />
                      </div>
                      <div className="text-[17px] font-semibold tracking-[0.04em] text-[#1f1a14] uppercase">{j.name}</div>
                    </Link>
                  ))}
                </div>
                <div className="h-1 bg-gold-bright w-full" />
              </div>
            </div>
          </div>

          <Link href="/services" className="hover:text-gold py-3">Services</Link>

          {/* Education mega */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-gold py-3 text-uppercase">
              EDUCATION <Chevron />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
              <div className="w-[360px] bg-[#f5f1ea] border border-[#e4d6bf] shadow-mega">
                <div className="py-4">
                  {navData.education.map((e) => (
                    <Link key={e} href="/blog" className="block px-7 py-4 text-[16px] leading-7 text-[#3f3529] hover:bg-sand">{e}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Brand */}
        <Link href="/" className="text-center flex-1 lg:flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-gold.png"
            alt="BRM Sri Lanka Precious Stones"
            className="h-10 sm:h-12 w-auto mx-auto object-contain"
          />
        </Link>

        {/* Desktop right nav */}
        <nav className="hidden lg:flex gap-8 uppercase tracking-[0.06em] text-[18px] leading-[1.2]">
          <Link href="/sell-gold" className="hover:text-gold text-gold">Sell Gold</Link>
          <Link href="/about" className="hover:text-gold">About Us</Link>
          <Link href="/blog" className="hover:text-gold">Blog</Link>
          <Link href="/contact" className="hover:text-gold">Contact</Link>
        </nav>

        {/* Mobile right icon */}
        <div className="lg:hidden flex items-center gap-2">
          <button className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#d8c5a6] text-ink" aria-label="Search">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 bg-black/40 transition-all duration-300 lg:hidden z-40 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* Mobile offcanvas */}
      <aside
        className={`fixed top-0 left-0 h-full w-[88%] max-w-[360px] bg-cream shadow-2xl transition-transform duration-300 lg:hidden z-50 overflow-y-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="sticky top-0 bg-cream border-b border-line px-4 py-4 flex items-center justify-between">
          <div>
            <div className="font-cormorant text-xl tracking-[0.16em]">PRESTIGE GEMS</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold-muted">Sri Lanka</div>
          </div>
          <button onClick={closeMobile} className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#d8c5a6]" aria-label="Close menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="space-y-2">
            {/* Gemstones accordion */}
            <div className="border-b border-[#eadfce]">
              <button onClick={() => toggleAccordion("gem")} className="w-full flex items-center justify-between py-4 text-left text-[18px]">
                <span>Gemstones</span>
                <span className="text-gold">{openAccordion === "gem" ? "−" : "+"}</span>
              </button>
              {openAccordion === "gem" && (
                <div className="pb-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[15px] text-[#43372a]">
                    {gems.map((g) => (
                      <Link key={g.slug} href={`/gemstones/${g.slug}`} onClick={closeMobile} className="flex items-center gap-2">
                        <span className="w-6 h-6 shrink-0 rounded-full bg-cover bg-center border border-[#d8c8b0]" style={{ backgroundImage: `url('${g.image}')` }} />
                        {g.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Jewelry accordion */}
            <div className="border-b border-[#eadfce]">
              <button onClick={() => toggleAccordion("jw")} className="w-full flex items-center justify-between py-4 text-left text-[18px]">
                <span>Jewelry</span>
                <span className="text-gold">{openAccordion === "jw" ? "−" : "+"}</span>
              </button>
              {openAccordion === "jw" && (
                <div className="pb-4 grid grid-cols-2 gap-4">
                  {jewels.map((j) => (
                    <Link key={j.slug ?? j.name} href={j.slug ? `/jewelry/${j.slug}` : "/jewelry"} onClick={closeMobile} className="bg-white rounded-2xl p-3 border border-[#eadfce] text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={j.image} alt={j.name} className="h-20 w-full object-cover rounded-xl mb-2" />
                      <div className="text-[14px]">{j.name}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Education accordion */}
            <div className="border-b border-[#eadfce]">
              <button onClick={() => toggleAccordion("edu")} className="w-full flex items-center justify-between py-4 text-left text-[18px]">
                <span>Education</span>
                <span className="text-gold">{openAccordion === "edu" ? "−" : "+"}</span>
              </button>
              {openAccordion === "edu" && (
                <div className="pb-4 space-y-3 text-[15px] text-[#43372a]">
                  {navData.education.map((e) => (
                    <Link key={e} href="/blog" onClick={closeMobile} className="block">{e}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/services" onClick={closeMobile} className="block py-4 border-b border-[#eadfce] text-[18px]">Services</Link>
            <Link href="/sell-gold" onClick={closeMobile} className="block py-4 border-b border-[#eadfce] text-[18px] text-gold">Sell Gold</Link>
            <Link href="/about" onClick={closeMobile} className="block py-4 border-b border-[#eadfce] text-[18px]">About Us</Link>
            <Link href="/blog" onClick={closeMobile} className="block py-4 border-b border-[#eadfce] text-[18px]">Blog</Link>
            <Link href="/contact" onClick={closeMobile} className="block py-4 border-b border-[#eadfce] text-[18px]">Contact</Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
