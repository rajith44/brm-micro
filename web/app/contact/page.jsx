import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Prestige Gems",
  description: "Visit our showroom or get in touch with our gemstone experts.",
};

const details = [
  { label: "Showroom", value: "Colombo / Ratnapura, Sri Lanka" },
  { label: "Phone", value: "+94 77 123 4567" },
  { label: "Email", value: "hello@example.com" },
  { label: "Hours", value: "Mon – Sat: 9.00 AM – 6.00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        crumb="Contact"
        subtitle="Book a private viewing, ask about a gemstone or start a custom commission — we'd love to hear from you."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-cormorant text-3xl mb-6">Get in touch</h2>
            <div className="space-y-5">
              {details.map((d) => (
                <div key={d.label} className="border-b border-line pb-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-1">{d.label}</div>
                  <div className="text-lg">{d.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[24px] overflow-hidden border border-line">
              <iframe
                title="Store location"
                className="w-full h-64"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.8%2C6.9%2C79.9%2C6.95&layer=mapnik"
              />
            </div>
          </div>
          <div>
            <h2 className="font-cormorant text-3xl mb-6">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
