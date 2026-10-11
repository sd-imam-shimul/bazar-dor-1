import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { fallbackProducts } from "@/lib/fallback";
import {
  formatBengaliPrice,
  toBengaliNumber,
  getChangeColor,
  getChangeIcon,
} from "@/lib/utils";

export async function generateStaticParams() {
  return fallbackProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const markets = product.markets || [];

  const min = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.price;
  const max = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.price;
  const avg =
    markets.length > 0
      ? Math.round(markets.reduce((s, m) => s + m.avg, 0) / markets.length)
      : product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-green-600">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-600"
        >
          {product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-4xl">
              {product.emoji}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500">
                {product.unit} · {product.category}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {product.change > 0
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : product.change < 0
                  ? "গতকালের তুলনায় আজ দাম কমেছে"
                  : "আজ দাম অপরিবর্তিত"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatBengaliPrice(product.price)}
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {product.unit.replace("প্রতি ", "")}
            </p>
            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded-md font-medium ${getChangeColor(
                product.change
              )}`}
            >
              {getChangeIcon(product.change)}{" "}
              {toBengaliNumber(Math.abs(product.change).toFixed(1))}%
            </span>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
        <h2 className="font-bold text-lg mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
            <p className="text-xs text-gray-600 mb-1">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-700">
              {formatBengaliPrice(min)} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="p-4 rounded-lg bg-red-50 border border-red-100">
            <p className="text-xs text-gray-600 mb-1">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-bold text-red-700">
              {formatBengaliPrice(max)} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">গড় দাম</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatBengaliPrice(avg)} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">{product.unit} হিসেবে</p>
          </div>
        </div>
      </div>

      {/* Markets Table */}
      {markets.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="font-bold text-lg mb-4">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-3 px-2 font-semibold text-gray-700">
                    বাজার
                  </th>
                  <th className="py-3 px-2 font-semibold text-gray-700">
                    বিভাগ
                  </th>
                  <th className="py-3 px-2 font-semibold text-gray-700">
                    সর্বনিম্ন
                  </th>
                  <th className="py-3 px-2 font-semibold text-gray-700">
                    সর্বোচ্চ
                  </th>
                  <th className="py-3 px-2 font-semibold text-gray-700">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-3 px-2 font-medium">{m.bazar}</td>
                    <td className="py-3 px-2 text-gray-600">{m.district}</td>
                    <td className="py-3 px-2">
                      {formatBengaliPrice(m.min)} টাকা
                    </td>
                    <td className="py-3 px-2">
                      {formatBengaliPrice(m.max)} টাকা
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      {formatBengaliPrice(m.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}