import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eee3d2] block hover:shadow-mega transition-shadow"
    >
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-cormorant text-lg leading-tight">{product.name}</h3>
        <p className="text-sm text-[#6a5844] mt-2">{product.detail}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          {product.price != null ? (
            <span className="font-semibold">£{Number(product.price).toLocaleString("en-GB")}</span>
          ) : (
            <span className="font-semibold text-gold"></span>
          )}
          <span className="inline-flex items-center gap-1 text-sm text-gold group-hover:text-gold-bright transition-colors">
            Read more
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
