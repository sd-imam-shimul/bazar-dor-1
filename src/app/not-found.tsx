import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <div className="text-[120px] leading-none mb-4">🔍</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">৪০৪ — পেজ পাওয়া যায়নি</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link href="/" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}