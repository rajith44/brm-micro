// Storefront data layer — fetches catalog data from the Laravel admin API.
// All calls run server-side (in Server Components), so there are no CORS concerns.

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getJson(path, { revalidate = 0 } = {}) {
  try {
    // revalidate: 0 → always fetch fresh, so admin changes (e.g. hide price,
    // settings, new products) reflect on the storefront immediately.
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Admin/API offline — let pages render gracefully with empty data.
    return null;
  }
}

export function getCategories(type) {
  const q = type ? `?type=${type}` : "";
  return getJson(`/api/categories${q}`).then((d) => d ?? []);
}

export function getProducts({ type, category, featured, limit } = {}) {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (category) params.set("category", category);
  if (featured) params.set("featured", "1");
  if (limit) params.set("limit", String(limit));
  const qs = params.toString();
  return getJson(`/api/products${qs ? `?${qs}` : ""}`).then((d) => d ?? []);
}

export function getProduct(slug) {
  return getJson(`/api/products/${slug}`);
}

export function getBlogs(limit) {
  const q = limit ? `?limit=${limit}` : "";
  return getJson(`/api/blogs${q}`).then((d) => d ?? []);
}

export function getBlog(slug) {
  return getJson(`/api/blogs/${slug}`);
}

export function getSettings() {
  return getJson("/api/settings").then((d) => d ?? {});
}

export function getSliders() {
  return getJson("/api/sliders").then((d) => d ?? []);
}

export function getTestimonials() {
  return getJson("/api/testimonials").then((d) => d ?? []);
}
