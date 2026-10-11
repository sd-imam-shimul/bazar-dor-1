import { getBengaliDate } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium mb-3">
            {getBengaliDate()}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <div className="text-[120px] md:text-[160px] leading-none select-none">🧺</div>
        </div>
      </div>
    </section>
  );
}