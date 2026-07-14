// Normalize media URLs returned by the Laravel API.
// Fixes localhost / 127.0.0.1 links when the server fetches the wrong API host.

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

/** Paths served from the Next.js public/ folder (not the Laravel API). */
const STOREFRONT_PREFIXES = [
  "/coloredGems/",
  "/jewelry/",
  "/hero/",
  "/images/",
  "/menu/",
  "/logo",
];

function isStorefrontAsset(pathname) {
  return STOREFRONT_PREFIXES.some(
    (prefix) => pathname === prefix.replace(/\/$/, "") || pathname.startsWith(prefix)
  );
}

export function resolveMediaUrl(url) {
  if (!url || typeof url !== "string") return url;

  if (url.startsWith("/") && !url.startsWith("/uploads/")) {
    return url;
  }

  if (url.startsWith("/uploads/")) {
    return `${API_BASE}${url}`;
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const path = `${parsed.pathname}${parsed.search}`;

  if (isStorefrontAsset(parsed.pathname)) {
    return path;
  }

  if (parsed.pathname.startsWith("/uploads/")) {
    return `${API_BASE}${path}`;
  }

  if (
    parsed.hostname === "localhost" ||
    parsed.hostname === "127.0.0.1"
  ) {
    return `${API_BASE}${path}`;
  }

  return url;
}

const MEDIA_KEYS = new Set(["image", "images"]);

export function normalizeMediaUrls(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeMediaUrls);
  }

  if (!data || typeof data !== "object") {
    return data;
  }

  const out = {};
  for (const [key, value] of Object.entries(data)) {
    if (MEDIA_KEYS.has(key)) {
      out[key] = Array.isArray(value) ? value.map(resolveMediaUrl) : resolveMediaUrl(value);
    } else {
      out[key] = normalizeMediaUrls(value);
    }
  }
  return out;
}
