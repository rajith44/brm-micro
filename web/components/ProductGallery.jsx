"use client";

import { useCallback, useEffect, useState } from "react";

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const count = images.length;
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, next, prev]);

  return (
    <>
      <div className="flex gap-3 sm:gap-4">
        {/* Thumbnails */}
        {count > 1 && (
          <div className="flex flex-col gap-3 sm:gap-4 w-16 sm:w-20 lg:w-24 shrink-0">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square rounded-xl overflow-hidden bg-clay border transition ${
                  i === active ? "border-gold ring-1 ring-gold" : "border-[#e4d6bf] hover:border-gold"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="relative flex-1 min-w-0 bg-clay rounded-[24px] overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full cursor-zoom-in"
            aria-label="Open full screen"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[active]} alt={name} className="w-full h-[380px] sm:h-[460px] lg:h-[520px] object-cover" />
          </button>

          {/* Expand button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Expand image"
            className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-coffee hover:bg-white transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8-18h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Backdrop click closes */}
          <div className="absolute inset-0" onClick={() => setOpen(false)} aria-hidden="true" />

          {count > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={name}
            className="relative z-0 max-w-[92vw] max-h-[88vh] object-contain select-none"
          />

          {count > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}

          {count > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm tracking-[0.15em]">
              {active + 1} / {count}
            </div>
          )}
        </div>
      )}
    </>
  );
}
