import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata = {
  title: "Jewelry Making Classes — Micro Art LTD",
  description:
    "Learn the art of fine jewelry-making with Micro Art's hands-on training classes. Open to beginners, hobbyists, entrepreneurs and professionals. Reserve your spot today.",
};

// Who the classes are for.
const audience = [
  {
    icon: "✦",
    title: "Students & Hobbyists",
    desc: "Explore your creativity and craft your very first piece from scratch.",
  },
  {
    icon: "◆",
    title: "Aspiring Entrepreneurs",
    desc: "Build the practical skills to launch your own jewelry business.",
  },
  {
    icon: "✺",
    title: "Working Professionals",
    desc: "Refine advanced techniques and sharpen your bench craftsmanship.",
  },
];

const gallery = [
  "/images/classes/gallery-1.png",
  "/images/classes/gallery-2.jpg",
  "/images/classes/gallery-3.png",
  "/images/classes/gallery-4.png",
];

export default function JewelryClassesPage() {
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hello Micro Art, I'd like to reserve a spot in your jewelry making class."
  )}`;

  return (
    <>
      <PageHero
        title="Jewelry Making Classes"
        crumb="Jewelry Classes"
        subtitle="Turn your creative vision into reality — hands-on training in the art of fine jewelry-making, for every level of skill."
      />

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 lg:px-8 py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-muted">Introducing</span>
        <h2 className="font-cormorant text-3xl lg:text-4xl leading-tight mt-3 mb-6">
          Jewelry Manufacturing Training Classes
        </h2>
        <p className="font-cormorant text-2xl lg:text-3xl text-gold italic leading-snug mb-8">
          &ldquo;Jewelry is more than an accessory — it&apos;s a story, a legacy, a work of art. Ready to
          turn your creative vision into reality?&rdquo;
        </p>
        <div className="space-y-5 text-[#6a5844] leading-8">
          <p>
            At Micro Art, we pride ourselves on being more than just purveyors of exquisite Sri Lankan
            gemstones — we are a cornerstone of knowledge and craftsmanship in the jewelry industry. In
            keeping with our commitment to preserving and passing down the art of fine jewelry-making, we
            are thrilled to offer our latest initiative.
          </p>
          <p>
            This service empowers aspiring jewelers, hobbyists and professionals alike with the skills and
            expertise needed to create timeless, high-quality pieces. Whether you are a beginner eager to
            learn the fundamentals or a seasoned jeweler looking to refine your techniques, our classes
            offer something for everyone.
          </p>
          <p className="font-medium text-ink">
            So — do you want a unique piece of jewelry as a memory of your trip to Sri Lanka?
          </p>
        </div>
      </section>

      {/* Who can join */}
      <section className="bg-sand/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeading
            title="Who Can Join?"
            subtitle="Our classes are open to anyone with a passion for jewelry-making."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {audience.map((a) => (
              <div key={a.title} className="bg-white rounded-[24px] border border-[#eee3d2] shadow-sm p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#f3eadb] flex items-center justify-center text-gold text-2xl mb-5">
                  {a.icon}
                </div>
                <h3 className="font-cormorant text-2xl mb-3">{a.title}</h3>
                <p className="text-sm text-[#6a5844] leading-7">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment details — feature image + pricing card */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/classes/enrollment.png"
            alt="Students at the Micro Art jewelry workshop"
            className="rounded-[24px] w-full h-full min-h-[360px] object-cover"
          />

          {/* Details + pricing */}
          <div className="bg-coffee text-white rounded-[24px] p-8 lg:p-10 flex flex-col">
            <h2 className="font-cormorant text-3xl lg:text-4xl mb-5">Enrollment Details</h2>
            <p className="text-white/80 leading-8 mb-4">
              Classes are conducted at our workshop — <span className="text-white font-medium">D&amp;O
              Internationals</span> — in a friendly and inspiring environment. To keep standards high and give
              individual attention, you can also book a private lesson, as long as you reserve in advance.
            </p>
            <p className="text-white/80 leading-8 mb-8">
              Contact us to reserve your spot — let&apos;s create masterpieces together.
            </p>

            {/* Pricing table */}
            <div className="rounded-2xl bg-white/10 border border-white/15 divide-y divide-white/15 mb-6">
              <div className="grid grid-cols-[90px_1fr_1fr] gap-3 px-5 py-4">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 self-center">Fees</span>
                <span>
                  <span className="block text-xs text-white/50">2 Hours</span>
                  <span className="font-cormorant text-2xl text-gold-bright">£22</span>
                </span>
                <span>
                  <span className="block text-xs text-white/50">3 Hours</span>
                  <span className="font-cormorant text-2xl text-gold-bright">£26</span>
                </span>
              </div>
              <div className="grid grid-cols-[90px_1fr_1fr] gap-3 px-5 py-4">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 self-center">Hours</span>
                <span>
                  <span className="block text-xs text-white/50">Morning</span>
                  <span className="text-lg">9:00 – 12:00</span>
                </span>
                <span>
                  <span className="block text-xs text-white/50">Afternoon</span>
                  <span className="text-lg">13:00 – 16:00</span>
                </span>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-white/70 mb-8">
              <li className="flex gap-2"><span className="text-gold-bright">✦</span> Material cost and casting fee are charged separately, in addition to the class fee.</li>
              <li className="flex gap-2"><span className="text-gold-bright">✦</span> Hours are flexible except Sundays and holidays — please contact us.</li>
            </ul>

            <div className="mt-auto flex flex-wrap gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-7 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition">Enroll on WhatsApp</a>
              <Link href="/contact" className="border border-white/50 px-7 py-3 rounded-full font-medium hover:bg-white/10 transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Student work / workshop gallery */}
      <section className="bg-sand/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <SectionHeading title="From Our Workshop" subtitle="A glimpse of our students at the bench and the pieces they create." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <div key={src} className="rounded-2xl overflow-hidden aspect-[4/5] bg-white border border-[#eee3d2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Workshop ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="bg-coffee text-white rounded-[24px] p-10 lg:p-16 text-center">
          <h2 className="font-cormorant text-3xl lg:text-4xl mb-4">Ready to create your masterpiece?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Reserve your spot in an upcoming class, or message us for private lessons and available dates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-7 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition">Enroll Now</a>
            <Link href="/contact" className="border border-white/60 px-7 py-3 rounded-full font-medium">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
