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
        <p className="mt-3 font-semibold">${product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
