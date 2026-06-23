/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        // alias kept so any lingering `font-playfair` usage still resolves
        playfair: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        cream: "#f7f3ec",
        sand: "#efe7da",
        clay: "#eadbc5",
        ink: "#2f2418",
        coffee: "#1f1a14",
        gold: {
          DEFAULT: "#a9803b",
          light: "#caa354",
          bright: "#d39a2a",
          muted: "#9c7c48",
        },
        line: "#e8dcc7",
      },
      boxShadow: {
        mega: "0 20px 60px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
