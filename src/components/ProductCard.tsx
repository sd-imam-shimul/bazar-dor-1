import Link from "next/link";
import { Product } from "@/lib/fallback";
import { formatBengaliPrice, getChangeColor, getChangeIcon, toBengaliNumber } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-2xl">
          {product.emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          {formatBengaliPrice(product.price)} টাকা
        </span>
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${getChangeColor(product.change)}`}>
          {getChangeIcon(product.change)} {toBengaliNumber(Math.abs(product.change).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
}