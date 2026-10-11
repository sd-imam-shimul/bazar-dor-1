import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { fallbackCategories } from "@/lib/fallback";
import { toBengaliNumber } from "@/lib/utils";
import CategoryClient from "./CategoryClient";

export const revalidate = 300;

export async function generateStaticParams() {
  return fallbackCategories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="text-gray-500 mb-6">"{slug}" নামে কোনো ক্যাটাগরি নেই</p>
        <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl p-6 mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-3xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-sm text-gray-500">এই পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-lg font-semibold mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি</p>
          <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <CategoryClient products={products} />
      )}
    </div>
  );
}