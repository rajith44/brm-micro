import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { allProducts, getProduct } from "@/lib/data";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found — Prestige Gems" };
  return {
    title: `${product.name} — Prestige Gems`,
    description: `${product.name} · ${product.detail}`,
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <nav className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-8">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span> / </span>
          <Link href="/gemstones" className="hover:text-gold">
            {product.type === "gemstone" ? "Gemstones" : "Jewelry"}
          </Link>
          {product.type === "gemstone" && product.categorySlug && (
            <>
              <span> / </span>
              <Link href={`/gemstones/${product.categorySlug}`} className="hover:text-gold">
                {product.category}
              </Link>
            </>
          )}
          <span> / {product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-clay rounded-[24px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} className="w-full h-[460px] object-cover" />
          </div>

          <div>
            <p className="text-gold-bright text-sm uppercase tracking-[0.18em] mb-3">{product.category}</p>
            <h1 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">${product.price.toLocaleString()}</p>
            <p className="text-[#6a5844] leading-8 mb-6">
              A collector-grade {product.category.toLowerCase()} ({product.detail}),
              hand-selected and certified for color, clarity and cut. Each piece
              ships with full documentation and our authenticity guarantee.
            </p>

            <ul className="space-y-3 text-sm border-t border-line pt-6">
              <li className="flex justify-between"><span className="text-[#6a5844]">Specification</span><span className="font-medium">{product.detail}</span></li>
              <li className="flex justify-between"><span className="text-[#6a5844]">Category</span><span className="font-medium">{product.category}</span></li>
              <li className="flex justify-between"><span className="text-[#6a5844]">Origin</span><span className="font-medium">Ceylon, Sri Lanka</span></li>
              <li className="flex justify-between"><span className="text-[#6a5844]">Certification</span><span className="font-medium">Included</span></li>
            </ul>

            <AddToCart name={product.name} />

            <div className="mt-6 flex gap-4">
              <Link href="/contact" className="border border-[#bfa272] px-6 py-3 rounded-full text-[#7b5d2d]">Ask a Question</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
          <h2 className="font-cormorant text-3xl mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
