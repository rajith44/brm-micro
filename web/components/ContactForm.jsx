"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const field =
    "w-full rounded-2xl px-4 py-3 border border-[#d9c8aa] bg-white outline-none focus:border-gold transition";

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-[#eee3d2] text-center">
        <div className="text-4xl mb-4 text-gold">✦</div>
        <h3 className="font-cormorant text-2xl mb-2">Thank you!</h3>
        <p className="text-[#6a5844]">Your message has been received. Our team will reply within one business day.</p>
        <button onClick={() => setSent(false)} className="mt-6 text-gold underline">Send another message</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="bg-white rounded-2xl p-6 lg:p-8 border border-[#eee3d2] shadow-sm space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Full name" className={field} />
        <input required type="email" placeholder="Email address" className={field} />
      </div>
      <input placeholder="Phone (optional)" className={field} />
      <input placeholder="Subject" className={field} />
      <textarea required rows={5} placeholder="Your message" className={field} />
      <button className="w-full bg-coffee text-white px-8 py-3 rounded-full font-medium hover:bg-coffee/90 transition">
        Send Message
      </button>
    </form>
  );
}
