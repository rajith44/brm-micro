import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-sand border-t border-line mt-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-cormorant text-2xl mb-4">Prestige Gems</div>
          <p className="text-sm leading-7 text-[#6a5844]">
            Luxury gemstone and jewelry storefront for exceptional Ceylon
            sapphires, rubies and handcrafted heirloom pieces inspired by Sri
            Lankan artistry.
          </p>
        </div>
        <div>
          <h3 className="font-cormorant text-2xl mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-[#6a5844]">
            <li><Link href="/gemstones" className="hover:text-gold">Blue Sapphires</Link></li>
            <li><Link href="/gemstones" className="hover:text-gold">Rubies</Link></li>
            <li><Link href="/gemstones" className="hover:text-gold">Yellow Sapphires</Link></li>
            <li><Link href="/jewelry" className="hover:text-gold">Jewelry Collection</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-cormorant text-2xl mb-4">Store Info</h3>
          <ul className="space-y-2 text-sm text-[#6a5844]">
            <li>Mon - Sat: 9.00 AM - 6.00 PM</li>
            <li>Colombo / Ratnapura, Sri Lanka</li>
            <li>+94 77 123 4567</li>
            <li>hello@example.com</li>
          </ul>
        </div>
        <div>
          <h3 className="font-cormorant text-2xl mb-4">Newsletter</h3>
          <p className="text-sm text-[#6a5844] mb-4">
            Get updates on collections, events and gemstone stories.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-line text-[#7d6b55]">
        © 2026 Prestige Gems — Luxury Ceylon Gemstones &amp; Jewelry
      </div>
    </footer>
  );
}
