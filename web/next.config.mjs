// STATIC_EXPORT=1 → fully static site (out/) for plain PHP/Apache shared hosting.
// Otherwise → standalone Node server (cPanel Node App / Vercel).
const isExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isExport ? "export" : "standalone",
  trailingSlash: isExport, // each route → /route/index.html (Apache-friendly)
  images: {
    unoptimized: isExport,
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
