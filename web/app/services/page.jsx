import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Services — Prestige Gems",
  description: "Custom design, gemstone setting, certification, repairs and jewelry classes.",
};

const services = [
  { icon: "✦", title: "Bespoke Custom Design", text: "Work with our designers to create a one-of-a-kind piece around your chosen gemstone." },
  { icon: "◆", title: "Gemstone Setting", text: "Expert setting of loose stones into rings, pendants, earrings and bracelets." },
  { icon: "◎", title: "Certification & Grading", text: "Independent gemstone certification, grading and valuation services." },
  { icon: "✺", title: "Repairs & Restoration", text: "Restore, resize and refurbish your treasured jewelry with master artisans." },
  { icon: "❖", title: "Sourcing & Investment", text: "Hand-sourcing of rare, collector-grade Ceylon stones for investment." },
  { icon: "✷", title: "Jewelry Classes", text: "Learn the art of jewelry making and gemstone identification with our experts." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        crumb="Services"
        subtitle="From bespoke design to certification and education — full-service expertise in the world of fine gemstones."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm border border-[#eee3d2]">
              <div className="w-14 h-14 mb-5 rounded-full bg-[#f3eadb] flex items-center justify-center text-gold text-2xl">{s.icon}</div>
              <h3 className="font-cormorant text-2xl mb-3">{s.title}</h3>
              <p className="text-sm text-[#6a5844] leading-7">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <SectionHeading title="Our Process" subtitle="A refined, transparent journey from stone to heirloom." />
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { n: "01", t: "Consultation", d: "Share your vision and budget with our team." },
            { n: "02", t: "Stone Selection", d: "Choose from certified Ceylon gemstones." },
            { n: "03", t: "Design & Craft", d: "Our artisans handcraft your piece." },
            { n: "04", t: "Delivery", d: "Secure, insured worldwide delivery." },
          ].map((p) => (
            <div key={p.n} className="bg-sand rounded-[24px] p-8">
              <div className="font-cormorant text-4xl text-gold mb-3">{p.n}</div>
              <h3 className="font-cormorant text-xl mb-2">{p.t}</h3>
              <p className="text-sm text-[#6a5844]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="bg-coffee text-white rounded-[24px] p-10 lg:p-16 text-center">
          <h2 className="font-cormorant text-3xl lg:text-4xl mb-4">Start your custom commission</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">Tell us what you have in mind and our designers will be in touch.</p>
          <Link href="/contact" className="bg-white text-coffee px-7 py-3 rounded-full font-medium inline-block">Get in Touch</Link>
        </div>
      </section>
    </>
  );
}
