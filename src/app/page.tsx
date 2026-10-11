import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

export const revalidate = 300;

export default async function HomePage() {
  const products = await getProducts();

  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div>
      <Hero />

      {risers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {fallers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}