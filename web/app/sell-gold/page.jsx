import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SellGoldCalculator from "@/components/SellGoldCalculator";
import { site } from "@/lib/site";

export const metadata = {
  title: "Sell Your Gold — Micro Art LTD",
  description:
    "Sell your gold jewellery, coins, sovereigns and scrap gold for the best prices in New Malden. Free valuation, instant payment. Live calculator or get your value on WhatsApp.",
};

// Sell Gold — phone line for this service.
const SELL_PHONE = "020 8912 0526";
const SELL_PHONE_HREF = "tel:+442089120526";

const buys = [
  { t: "Gold Jewellery", d: "Rings, chains, bangles, bracelets & earrings — any condition." },
  { t: "Broken & Scrap Gold", d: "Odd earrings, tangled chains and damaged pieces." },
  { t: "Gold Coins", d: "Sovereigns, Krugerrands, Britannias & bullion coins." },
  { t: "Gold Bars & Bullion", d: "Investment bars of any weight." },
  { t: "9ct – 24ct", d: "All carats accurately tested and paid by weight & purity." },
  { t: "Dental & Other Gold", d: "Dental gold and unmarked items — tested on site." },
];

const steps = [
  { n: "01", t: "Bring or send", d: "Visit our New Malden showroom, or message us on WhatsApp first." },
  { n: "02", t: "Free test & weigh", d: "We test purity and weigh your gold in front of you — no obligation." },
  { n: "03", t: "Best price offer", d: "We quote a transparent price based on today's live gold rate." },
  { n: "04", t: "Instant payment", d: "Accept and get paid immediately by cash or bank transfer." },
];

export default function SellGoldPage() {
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hello Micro Art, I'd like to know the value of my gold."
  )}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    "Micro Art, 80 Burlington Road, New Malden KT3 4NU"
  )}&output=embed`;

  return (
    <>
      <PageHero
        title="Sell Your Gold"
        crumb="Sell Gold"
        subtitle="Turn your unwanted gold into cash — the best prices in New Malden, based on today's live gold rate. Free, no-obligation valuations."
      />

      {/* Intro + trust */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-cormorant text-4xl lg:text-5xl leading-tight mb-6">
              The trusted place to sell your gold.
            </h2>
            <p className="text-[#6a5844] leading-8 mb-5">
              At Micro Art we pay some of the highest prices for gold in the area.
              Whether it&apos;s old jewellery, broken chains, coins or scrap gold,
              our experts test and weigh every item in front of you and pay you on
              the spot — with no pressure and no obligation.
            </p>
            <ul className="space-y-3">
              {[
                "Best prices based on the live gold market",
                "Free, instant valuation — no appointment needed",
                "Immediate payment by cash or bank transfer",
                "Honest, transparent testing in front of you",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-[#43372a]">
                  <span className="mt-1 text-gold">✦</span> {li}
                </li>
              ))}
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sale-gold.png"
            alt="Sell your gold at Micro Art"
            className="rounded-[24px] w-full h-[420px] object-cover"
          />
        </div>
      </section>

      {/* What we buy */}
      <section className="bg-sand/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeading title="What We Buy" subtitle="We purchase gold in every form and condition." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {buys.map((b) => (
              <div key={b.t} className="bg-white rounded-2xl p-6 border border-[#eee3d2] shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#f3eadb] flex items-center justify-center text-gold text-xl mb-4">✦</div>
                <h3 className="font-cormorant text-xl mb-2">{b.t}</h3>
                <p className="text-sm text-[#6a5844] leading-7">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two options: calculator + WhatsApp */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <SectionHeading
          title="Get Your Gold Value"
          subtitle="Two easy ways to find out what your gold is worth."
        />
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Option 1 — live calculator */}
          <SellGoldCalculator />

          {/* Option 2 — WhatsApp */}
          <div className="bg-coffee text-white rounded-[24px] p-8 lg:p-10 h-full flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </div>
            <h3 className="font-cormorant text-3xl mb-3">Get your value on WhatsApp</h3>
            <p className="text-white/80 leading-8 mb-6 flex-1">
              Prefer to speak to a person? Send us a photo and rough weight of your
              gold on WhatsApp and our team will give you an indicative value and
              answer any questions — quick, friendly and free.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 bg-[#25D366] text-white px-7 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition"
            >
              Message us on WhatsApp
            </a>
            <p className="text-white/60 text-sm mt-4">
              Or call <a href={SELL_PHONE_HREF} className="underline hover:text-white">{SELL_PHONE}</a>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeading title="How It Works" subtitle="Sell your gold in four simple steps." />
          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-[24px] p-8 border border-[#eee3d2]">
                <div className="font-cormorant text-4xl text-gold mb-3">{s.n}</div>
                <h3 className="font-cormorant text-xl mb-2">{s.t}</h3>
                <p className="text-sm text-[#6a5844] leading-7">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit / contact / hours */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-cormorant text-4xl mb-6">Visit Us</h2>
            <div className="space-y-5">
              <div className="border-b border-line pb-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-1">Address</div>
                <div className="text-lg">Micro Art, 80 Burlington Road, New Malden</div>
              </div>
              <div className="border-b border-line pb-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-1">Call</div>
                <a href={SELL_PHONE_HREF} className="text-lg hover:text-gold transition">{SELL_PHONE}</a>
              </div>
              <div className="border-b border-line pb-4">
                <div className="text-xs uppercase tracking-[0.2em] text-gold-muted mb-2">Opening Hours</div>
                <ul className="space-y-1.5 text-[15px]">
                  <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Monday</span><span>10:30 – 6:00</span></li>
                  <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Tuesday</span><span className="text-gold-muted">Closed</span></li>
                  <li className="flex justify-between gap-4"><span className="text-[#6a5844]">Wednesday – Sunday</span><span>10:30 – 6:00</span></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition">WhatsApp Us</a>
              <a href={SELL_PHONE_HREF} className="border border-[#bfa272] px-6 py-3 rounded-full text-[#7b5d2d]">Call {SELL_PHONE}</a>
            </div>
          </div>
          <div className="rounded-[24px] overflow-hidden border border-line min-h-[320px]">
            <iframe title="Micro Art location" className="w-full h-full min-h-[320px]" loading="lazy" src={mapEmbed} />
          </div>
        </div>
      </section>
    </>
  );
}
