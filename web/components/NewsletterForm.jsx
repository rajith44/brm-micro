"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <p className="text-sm text-gold">Thank you for subscribing ✓</p>
    );
  }

  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Email address"
        className="flex-1 w-full rounded-l-full px-4 py-3 border border-[#d9c8aa] bg-white outline-none"
      />
      <button className="bg-coffee text-white px-5 rounded-r-full">Join</button>
    </form>
  );
}
