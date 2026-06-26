import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";
import ProductGallery from "@/components/ProductGallery";
import ProductCarousel from "@/components/ProductCarousel";
import { getProduct, getProducts } from "@/lib/api";

export const dynamicParams = true;

export async function generateStaticParams() {
  if (process.env.STATIC_EXPORT !== "1") return [];
  const products = await getProducts({});
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product not found — Prestige Gems" };
  return {
    title: `${product.name} — Prestige Gems`,
    description: `${product.name}${product.detail ? ` · ${product.detail}` : ""}`,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const base = product.type === "gemstone" ? "/gemstones" : "/jewelry";

  const pool = (await getProducts({ type: product.type, limit: 24 })).filter(
    (p) => p.id !== product.id
  );
  const sameCategory = pool.filter((p) => p.categorySlug === product.category?.slug);
  const others = pool.filter((p) => p.categorySlug !== product.category?.slug);
  const related = [...sameCategory, ...others].slice(0, 12);

  const images = product.images?.length
    ? product.images
    : [product.image || "https://placehold.co/900x900?text=No+Image"];

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <nav className="text-xs uppercase tracking-[0.25em] text-gold-muted mb-8">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span> / </span>
          <Link href={base} className="hover:text-gold">
            {product.type === "gemstone" ? "Gemstones" : "Jewelry"}
          </Link>
          {product.category && (
            <>
              <span> / </span>
              <Link href={`${base}/${product.category.slug}`} className="hover:text-gold">
                {product.category.name}
              </Link>
            </>
          )}
          <span> / {product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <ProductGallery images={images} name={product.name} />

          <div>
            {product.category && (
              <p className="text-gold-bright text-sm uppercase tracking-[0.18em] mb-3">{product.category.name}</p>
            )}
            <h1 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-4">{product.name}</h1>
            {product.price != null ? (
              <p className="text-2xl font-semibold mb-6">${Number(product.price).toLocaleString()}</p>
            ) : (
              <p className="text-xl font-semibold text-gold mb-6"></p>
            )}
            {product.detail && (
              <p className="text-[#6a5844] leading-8 mb-6">{product.detail}</p>
            )}

            <ul className="space-y-3 text-sm border-t border-line pt-6">
              {product.sku && (
                <li className="flex justify-between"><span className="text-[#6a5844]">Item Code</span><span className="font-medium">{product.sku}</span></li>
              )}
              <li className="flex justify-between"><span className="text-[#6a5844]">Category</span><span className="font-medium">{product.category?.name ?? "—"}</span></li>
              <li className="flex justify-between"><span className="text-[#6a5844]">Origin</span><span className="font-medium">Ceylon, Sri Lanka</span></li>
              <li className="flex justify-between"><span className="text-[#6a5844]">Certification</span><span className="font-medium">Included</span></li>
            </ul>

            <ProductActions product={product} />
          </div>
        </div>
      </section>

      {/* Description + specifications */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-10 lg:pb-16">
        <div className="bg-white rounded-[24px] border border-[#eee3d2] p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-cormorant text-3xl mb-6">Description</h2>
              <div className="space-y-5 text-[#43372a] leading-8">
                {(product.description || "").split("\n\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {!product.description && (
                  <p>
                    A collector-grade piece from the Prestige Gems collection, hand-selected
                    and certified. Each order ships insured worldwide with full documentation.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {(product.attributeGroups || []).map((group) => (
                <div key={group.title} className="bg-sand rounded-2xl p-6">
                  <h3 className="font-cormorant text-xl mb-4">{group.title}</h3>
                  <ul className="space-y-3 text-sm">
                    {group.fields.map((f) => (
                      <li key={f.label} className="flex justify-between gap-4">
                        <span className="text-[#6a5844]">{f.label}</span>
                        <span className="font-medium text-right">{f.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
