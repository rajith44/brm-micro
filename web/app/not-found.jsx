import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 lg:px-8 py-28 text-center">
      <div className="text-gold text-5xl mb-6">✦</div>
      <h1 className="font-cormorant text-5xl mb-4">Page not found</h1>
      <p className="text-[#6a5844] mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="bg-coffee text-white px-7 py-3 rounded-full inline-block">Back to Home</Link>
    </section>
  );
}
