import Link from "next/link";

// Compact banner used at the top of inner pages.
export default function PageHero({ title, subtitle, crumb }) {
  return (
    <section className="bg-sand border-b border-line">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20 text-center">
        <nav className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-4">
          <Link href="/" className="hover:text-gold">Home</Link>
          {crumb && <span> / {crumb}</span>}
        </nav>
        <h1 className="font-cormorant text-4xl lg:text-5xl">{title}</h1>
        {subtitle && (
          <p className="text-[#6a5844] mt-4 max-w-2xl mx-auto leading-8">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
