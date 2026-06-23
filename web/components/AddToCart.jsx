"use client";

import { useState } from "react";

export default function AddToCart({ name }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-[#d9c8aa] rounded-full overflow-hidden bg-white">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg" aria-label="Decrease">−</button>
          <span className="px-4 min-w-[2.5rem] text-center">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-lg" aria-label="Increase">+</button>
        </div>
        <button
          onClick={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className="flex-1 bg-coffee text-white px-8 py-3 rounded-full font-medium hover:bg-coffee/90 transition"
        >
          {added ? "Added to inquiry ✓" : "Add to inquiry"}
        </button>
      </div>
      {added && (
        <p className="text-sm text-[#6a5844] mt-3">
          {qty} × {name} added. Our team will contact you to confirm.
        </p>
      )}
    </div>
  );
}
