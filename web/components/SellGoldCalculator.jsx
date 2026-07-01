"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";

// Fineness (purity) of common carats.
const CARATS = [
  { k: "24ct", factor: 0.999 },
  { k: "22ct", factor: 0.916 },
  { k: "21ct", factor: 0.875 },
  { k: "18ct", factor: 0.75 },
  { k: "14ct", factor: 0.585 },
  { k: "9ct", factor: 0.375 },
];

const gbp = (n) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    Number.isFinite(n) ? n : 0
  );

export default function SellGoldCalculator() {
  const [weight, setWeight] = useState("");
  const [carat, setCarat] = useState("22ct");
  // Indicative 24ct price per gram — update to today's live rate.
  const [price24, setPrice24] = useState("78");

  const factor = CARATS.find((c) => c.k === carat)?.factor ?? 0;
  const perGram = (parseFloat(price24) || 0) * factor;
  const estimate = useMemo(
    () => (parseFloat(weight) || 0) * perGram,
    [weight, perGram]
  );

  const waText = encodeURIComponent(
    `Hello Micro Art, I'd like to sell my gold.\n` +
      `Weight: ${weight || "?"} g\nCarat: ${carat}\n` +
      `Indicative value: ${gbp(estimate)}\nPlease confirm today's price.`
  );
  const waLink = `https://wa.me/${site.whatsapp}?text=${waText}`;

  const field =
    "w-full rounded-2xl px-4 py-3 border border-[#d9c8aa] bg-white outline-none focus:border-gold transition";

  return (
    <div className="bg-white rounded-[24px] border border-[#eee3d2] shadow-sm p-6 lg:p-8">
      <h3 className="font-cormorant text-2xl mb-1">Live Gold Calculator</h3>
      <p className="text-sm text-[#6a5844] mb-6">
        Get an instant, indicative valuation for your gold.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weight (grams)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            placeholder="e.g. 12.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Carat / purity</label>
          <select value={carat} onChange={(e) => setCarat(e.target.value)} className={field}>
            {CARATS.map((c) => (
              <option key={c.k} value={c.k}>{c.k}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Today&apos;s 24ct price (£ / gram)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={price24}
            onChange={(e) => setPrice24(e.target.value)}
            className={field}
          />
          <p className="text-xs text-[#9c7c48] mt-1">
            Live spot prices change daily — adjust to today&apos;s rate, or message us and we&apos;ll confirm.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-sand p-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-muted">Estimated value</div>
          <div className="font-cormorant text-4xl text-gold mt-1">{gbp(estimate)}</div>
          <div className="text-xs text-[#6a5844] mt-1">
            {carat} · {gbp(perGram)}/g
          </div>
        </div>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1ebe57] transition"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        Get my gold value on WhatsApp
      </a>

      <p className="text-[11px] text-[#9c7c48] mt-3 text-center">
        Estimate only. Final price is confirmed after in-store testing &amp; weighing.
      </p>
    </div>
  );
}
