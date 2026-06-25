import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/api";

export const metadata = {
  title: "Contact — Micro Art LTD",
  description: "Visit our New Malden showroom or get in touch with our gemstone experts.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const b = settings.business || {};
  const social = settings.social && Object.keys(settings.social).length ? settings.social : site.social;

  const address = b.address || site.address;
  const tel = b.tel || site.tel;
  const mobile = b.mobile || site.mobile;
  const whatsapp = b.whatsapp || site.whatsapp;
  const email = b.email || site.email;
  const hours = b.hours || site.hours;
  const mapEmbed = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
    : site.mapEmbed;

  const details = [
    { label: "Showroom", value: address },
    { label: "Phone", value: tel, href: `tel:${(tel || "").replace(/[^\d+]/g, "")}` },
    { label: "Mobile / WhatsApp", value: mobile, href: `https://wa.me/${whatsapp}` },
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Hours", value: hours },
  ];

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
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-lg hover:text-gold transition"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <div className="text-lg">{d.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-6">
              {Object.entries(social).map(([platform, url]) =>
                url ? (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6a5844] hover:text-gold underline capitalize">
                    {platform}
                  </a>
                ) : null
              )}
            </div>

            <div className="mt-8 rounded-[24px] overflow-hidden border border-line">
              <iframe title="Showroom location" className="w-full h-64" loading="lazy" src={mapEmbed} />
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
