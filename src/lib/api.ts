import { fallbackProducts, fallbackCategories, Product } from "./fallback";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function fetchFromApi(path: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
}

function extractList(json: any): any[] {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.products)) return json.products;
  if (Array.isArray(json.categories)) return json.categories;
  return [];
}

// Map Bengali unit name
function mapUnit(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    gram: "প্রতি গ্রাম",
    g: "প্রতি গ্রাম",
  };
  return map[unit?.toLowerCase()] || `প্রতি ${unit || "কেজি"}`;
}

function normalizeProduct(raw: any, index: number): Product {
  const price = Number(raw.today ?? raw.price ?? raw.currentPrice ?? 0);
  const yesterday = Number(raw.yesterday ?? 0);
  const previousPrice = yesterday > 0 ? yesterday : undefined;

  // change.pct from API or calculate
  let change = 0;
  if (raw.change?.pct !== undefined) {
    change = Number(raw.change.pct);
  } else if (previousPrice && previousPrice > 0) {
    change = ((price - previousPrice) / previousPrice) * 100;
  }

  // Markets mapping - API uses "market", "division", "min", "max"
  const markets = (raw.markets || []).map((m: any) => ({
    bazar: m.market ?? m.bazar ?? "",
    district: m.division ?? m.district ?? "",
    min: Number(m.min ?? m.minPrice ?? 0),
    max: Number(m.max ?? m.maxPrice ?? 0),
    avg: Number(
      m.avg ??
        m.average ??
        Math.round((Number(m.min ?? 0) + Number(m.max ?? 0)) / 2)
    ),
  }));

  return {
    id: raw.id ?? index + 1,
    name: raw.nameBn ?? raw.name ?? "Unknown",
    slug: raw.slug ?? `product-${raw.id ?? index + 1}`,
    emoji: raw.image ?? raw.emoji ?? raw.icon ?? "📦",
    unit: mapUnit(raw.unit ?? "kg"),
    price: isNaN(price) ? 0 : price,
    previousPrice,
    change: isNaN(change) ? 0 : Number(change.toFixed(1)),
    category: raw.category ?? "general",
    description: raw.description ?? raw.nameBn ?? "",
    markets,
  };
}

export async function getProducts(): Promise<Product[]> {
  const json = await fetchFromApi("/products");
  const list = extractList(json);

  if (list.length > 0) {
    return list.map((p, i) => normalizeProduct(p, i));
  }
  return fallbackProducts;
}

export async function getCategories(): Promise<
  { slug: string; name: string; icon: string }[]
> {
  const json = await fetchFromApi("/categories");
  const list = extractList(json);

  if (list.length > 0) {
    return list.map((c: any) => ({
      slug: c.slug ?? c.id ?? c.name ?? c.nameBn,
      name: c.nameBn ?? c.name ?? c.title ?? "Unknown",
      icon: c.icon ?? c.emoji ?? "📦",
    }));
  }
  return fallbackCategories;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Try fetching all products, then find by slug
  const products = await getProducts();
  const found = products.find(
    (p) => p.slug === slug || String(p.id) === slug
  );
  if (found) return found;

  // Fallback: try direct API
  const json = await fetchFromApi(`/products/${slug}`);
  if (json?.data) {
    return normalizeProduct(json.data, 0);
  }
  if (Array.isArray(json) && json.length > 0) {
    return normalizeProduct(json[0], 0);
  }
  return null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const json = await fetchFromApi(`/products?category=${slug}`);
  const list = extractList(json);

  if (list.length > 0) {
    return list.map((p, i) => normalizeProduct(p, i));
  }

  // Client-side filter fallback
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}

export async function getCategoryBySlug(slug: string) {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) || null;
}