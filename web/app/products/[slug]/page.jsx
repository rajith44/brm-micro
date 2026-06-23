import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";
import ProductGallery from "@/components/ProductGallery";
import ProductCarousel from "@/components/ProductCarousel";
import { allProducts, getProduct, getProductImages } from "@/lib/data";

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

  const pool = allProducts.filter((p) => p.type === product.type && p.id !== product.id);
  const sameCategory = pool.filter((p) => p.category === product.category);
  const others = pool.filter((p) => p.category !== product.category);
  const related = [...sameCategory, ...others].slice(0, 12);

  const images = getProductImages(product);

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
          <ProductGallery images={images} name={product.name} />

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

            <ProductActions product={product} />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-10 lg:pb-16">
        <div className="bg-white rounded-[24px] border border-[#eee3d2] p-8 lg:p-12">
          <h2 className="font-cormorant text-3xl mb-6">Description</h2>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-5 text-[#43372a] leading-8">
              {product.description ? (
                product.description.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <>
                  <p>
                    This {product.detail.toLowerCase()} {product.category.toLowerCase()} is a
                    collector-grade Ceylon gemstone, hand-selected by our gemologists for its
                    exceptional colour saturation, clarity and precision of cut. Mined and
                    crafted in Sri Lanka — the island long regarded as the world&apos;s finest
                    source of coloured stones.
                  </p>
                  <p>
                    Every stone in our collection is independently certified and accompanied by
                    full documentation detailing its weight, dimensions, treatment and origin,
                    so you can buy with complete confidence. Whether destined for a bespoke
                    engagement ring or a considered addition to a collection, this piece offers
                    rare beauty and lasting value.
                  </p>
                  <p>
                    Each order is insured and shipped worldwide in secure, signature-required
                    packaging, and is backed by our authenticity guarantee and dedicated
                    after-sales support.
                  </p>
                </>
              )}
            </div>

            <div className="bg-sand rounded-2xl p-6 h-fit">
              <h3 className="font-cormorant text-xl mb-4">At a glance</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Type</span><span className="font-medium text-right">{product.category}</span></li>
                <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Specification</span><span className="font-medium text-right">{product.detail}</span></li>
                <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Origin</span><span className="font-medium text-right">Ceylon, Sri Lanka</span></li>
                <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Certification</span><span className="font-medium text-right">Included</span></li>
                <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Shipping</span><span className="font-medium text-right">Insured worldwide</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
          <h2 className="font-cormorant text-3xl mb-8">You may also like</h2>
          <ProductCarousel products={related} />
        </section>
      )}
    </>
  );
}
