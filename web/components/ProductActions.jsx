"use client";

import { useEffect, useState } from "react";
import { whatsappNumber } from "@/lib/data";

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function ProductActions({ product }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const waText = encodeURIComponent(
    `Hello Micro Art LTD, I'm interested in ${product.name} (Ref: ${product.id}, ${product.detail}). Is it available?`
  );
  const waLink = `https://wa.me/${whatsappNumber}?text=${waText}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const field =
    "w-full rounded-2xl px-4 py-3 border border-[#d9c8aa] bg-white outline-none focus:border-gold transition";

  return (
    <>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setOpen(true);
          }}
          className="flex-1 bg-coffee text-white px-8 py-3 rounded-full font-medium hover:bg-coffee/90 transition"
        >
          Inquire Now
        </button>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition"
        >
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product inquiry"
            className="relative bg-cream w-full max-w-md rounded-[24px] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
              <div>
                <h3 className="font-cormorant text-2xl leading-tight">Inquire about this piece</h3>
                <p className="text-sm text-[#6a5844] mt-1">{product.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#d8c5a6] hover:bg-sand transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4 text-gold">✦</div>
                <h4 className="font-cormorant text-2xl mb-2">Thank you!</h4>
                <p className="text-[#6a5844] mb-6">
                  Your inquiry for <span className="font-medium">{product.name}</span> has been
                  received. Our team will be in touch shortly.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition"
                >
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form
                className="p-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <input required placeholder="Full name" className={field} />
                <input
                  required
                  type="tel"
                  placeholder="WhatsApp number"
                  className={field}
                />
                <input required type="email" placeholder="Email address" className={field} />
                <textarea
                  required
                  rows={4}
                  className={field}
                  defaultValue={`I'm interested in ${product.name} (Ref: ${product.id}). Please share more details.`}
                />
                <button
                  type="submit"
                  className="w-full bg-coffee text-white px-8 py-3 rounded-full font-medium hover:bg-coffee/90 transition"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
