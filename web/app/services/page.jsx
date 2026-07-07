import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata = {
  title: "Services & Price List — Micro Art LTD",
  description:
    "Jewellery repair, laser engraving, polishing and stone setting & hand engraving at Micro Art, New Malden. See our starting prices and stone setting price list.",
};

const services = [
  {
    n: "01",
    title: "Jewellery Repair",
    image: "/images/services/jewellery-repair.png",
    desc: "We are pleased to offer you a comprehensive solution to your jewelry repair needs. Maintaining your precious jewelry is essential and we will help you to make sure you take the best possible care of your pieces. We have a workshop dedicated for jewelry repairs. We can repair broken or unwearable jewelry and return it to its original glory so you can enjoy them again. All jewelry repairs carried out at Prestige Gems are fully guaranteed and of the highest quality. We offer a range of repair services including prong rebuilding, shanks replaced on rings, chain/bracelet repairs and soldering, fitting new clasp and engraving. Most jewelry repairs take between 2-12 working days, depending upon the complexity of the job. You will be given a quote and estimated finishing time before any work has begun.",
    prices: [
      { label: "Ring resizing", note: "Polish included", price: "£30" },
      { label: "Chain soldering & repair", note: "Depending on design and length · polish free", price: "£40" },
      { label: "Ring reshape", note: "Depending on size", price: "£20" },
    ],
  },
  {
    n: "02",
    title: "Laser Engraving",
    image: "/images/services/laser-engraving.png",
    desc: "We are pleased to offer you a comprehensive solution to your laser engraving needs. We have a workshop dedicated for laser engraving. We can engrave your pieces with your own choice of text, date or symbol. All laser engraving carried out at Prestige Gems are fully guaranteed and of the highest quality. We offer a range of laser engraving services including two names, date and heart or symbol. We can also hand engrave your pieces with your own choice of text, date or symbol. All laser engraving carried out at Prestige Gems are fully guaranteed and of the highest quality.",
    prices: [{ label: "Laser engraving", note: "Two names, date & heart or symbol", price: "£30" }],
  },
  {
    n: "03",
    title: "Jewellery Polish",
    image: "/images/services/jewellery-polish.png",
    desc: "From time to time, you should bring your jewelry in for a polishing to keep up its fresh appearance. Day to day activities can take its toll on your jewelry. In particular, dust, oils, and dirt can get on the surface and in the openings of your jewelry causing it to lose its luster. Bring back your dull jewelry’s to its original glimmer and shine with our expert jewelry cleaning and polishing service.",
    prices: [{ label: "Polishing", note: "Price may increase depending on the size", price: "£20" }],
  },
  {
    n: "04",
    title: "Stone Setting & Hand Engraving",
    image: "/images/services/stone-setting-hand-engraving.png",
    desc: "We are pleased to offer you a comprehensive solution to your stone setting needs. We have a workshop dedicated for stone setting and hand engraving. We can set stones in a variety of settings including micro setting, pavé setting, channel setting and robur setting. We can also hand engrave your pieces with your own choice of text, date or symbol. All stone setting and hand engraving carried out at Prestige Gems are fully guaranteed and of the highest quality. We offer a range of stone setting and hand engraving services including micro setting, pavé setting, channel setting and robur setting. We can also hand engrave your pieces with your own choice of text, date or symbol. All stone setting and hand engraving carried out at Prestige Gems are fully guaranteed and of the highest quality.",
    prices: [
      { label: "Stone setting", note: "Per stone, by size — see price list below", price: "£3" },
      { label: "Hand engraving", note: "Price may increase depending on size and design", price: "£100" },
    ],
  },
];

// Stone Set Price List (prices are per stone, by stone size).
const stoneSetting = [
  {
    group: "Micro Setting",
    rows: [
      { label: "Plain Band", s1: "£4", s2: "£6" },
      { label: "Casting Claw Ring & Band", s1: "£3", s2: "£4" },
    ],
  },
  {
    group: "Pavé Setting",
    rows: [
      { label: "Plain Band & Ring", s1: "£5", s2: "£8" },
      { label: "Casting Claw Ring & Band", s1: "£3", s2: "£4" },
    ],
  },
  {
    group: "Channel Setting",
    rows: [
      { label: "Plain Band & Ring", s1: "£7", s2: "£10" },
      { label: "Casting Channel Made Ring", s1: "£5", s2: "£7" },
    ],
  },
  {
    group: "Robur Setting",
    rows: [{ label: "Robur setting", s1: "£4", s2: "£6" }],
  },
  {
    group: "Center Stone Setting",
    rows: [{ label: "Center stone setting", s1: "Starts from £15", s2: "" }],
  },
];

export default function ServicesPage() {
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hello Micro Art, I'd like to enquire about a jewellery service."
  )}`;

  return (
    <>
      <PageHero
        title="Our Services"
        crumb="Services"
        subtitle="Jewellery repair, laser engraving, polishing and stone setting — expert craftsmanship at our New Malden workshop."
      />

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <SectionHeading title="Services & Price List" subtitle="Our starting prices — final quote confirmed in store." />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.n} className="bg-white rounded-[24px] border border-[#eee3d2] shadow-sm overflow-hidden flex flex-col">
              {/* Single image for the service */}
              <div className="relative h-80 lg:h-80 bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 w-12 h-12 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center font-cormorant text-2xl text-gold shadow">
                  {s.n}
                </span>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-cormorant text-2xl leading-tight mb-3">{s.title}</h3>
                <p className="text-sm text-[#6a5844] leading-7 mb-6">{s.desc}</p>

                <ul className="mt-auto divide-y divide-line border-t border-line">
                  {s.prices.map((p) => (
                    <li key={p.label} className="flex items-start justify-between gap-4 py-3">
                      <span>
                        <span className="font-medium">{p.label}</span>
                        {p.note && <span className="block text-xs text-[#9c7c48] mt-0.5">{p.note}</span>}
                      </span>
                      <span className="whitespace-nowrap text-right">
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-gold-muted">from</span>
                        <span className="font-cormorant text-2xl text-gold">{p.price}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#9c7c48] mt-6 text-center">
          Prices shown are starting prices and may vary depending on the size, design and condition of the piece.
        </p>
      </section>

      {/* Stone Setting Price List */}
      <section className="bg-sand/50">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeading
            title="Stone Setting Price List"
            subtitle="Prices are per stone and vary by stone size."
          />

          <div className="bg-white rounded-[24px] border border-[#eee3d2] shadow-sm overflow-hidden">
            {/* Column header */}
            <div className="grid grid-cols-[1fr_auto] gap-4 items-end px-6 lg:px-8 py-4 bg-coffee text-white">
              <div className="font-cormorant text-xl">Setting</div>
              <div className="flex gap-3 text-center">
                <div className="w-20">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">Size</div>
                  <div className="font-medium">1–2mm</div>
                </div>
                <div className="w-20">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">Size</div>
                  <div className="font-medium">2–3mm</div>
                </div>
              </div>
            </div>

            {stoneSetting.map((grp) => (
              <div key={grp.group} className="border-t border-line first:border-t-0">
                <div className="px-6 lg:px-8 pt-5 pb-2 font-cormorant text-lg text-gold">{grp.group}</div>
                <ul>
                  {grp.rows.map((r) => (
                    <li
                      key={r.label}
                      className="grid grid-cols-[1fr_auto] gap-4 items-center px-6 lg:px-8 py-3 border-t border-line/60"
                    >
                      <span className="text-[#43372a]">{r.label}</span>
                      {r.s2 ? (
                        <span className="flex gap-3 text-center">
                          <span className="w-20 font-cormorant text-xl text-gold">{r.s1}</span>
                          <span className="w-20 font-cormorant text-xl text-gold">{r.s2}</span>
                        </span>
                      ) : (
                        <span className="w-[172px] text-right font-cormorant text-xl text-gold">{r.s1}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#9c7c48] mt-4 text-center">
            All prices are per stone and may vary with the design and condition of the piece. Final quote confirmed in store.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="bg-coffee text-white rounded-[24px] p-10 lg:p-16 text-center">
          <h2 className="font-cormorant text-3xl lg:text-4xl mb-4">Book a repair or engraving</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Visit our New Malden showroom or message us on WhatsApp with a photo and we&apos;ll give you a quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-7 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition">Message on WhatsApp</a>
            <Link href="/contact" className="border border-white/60 px-7 py-3 rounded-full font-medium">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
