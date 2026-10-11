"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import { Product } from "@/lib/fallback";
import { toBengaliNumber } from "@/lib/utils";

export default function CategoryClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = [...products].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <p className="text-sm text-gray-500">
          মোট {toBengaliNumber(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <SortDropdown value={sort} onChange={setSort} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}