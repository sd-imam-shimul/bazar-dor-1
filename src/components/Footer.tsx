export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-600">
        <p>
          <strong className="text-gray-900">বাজার দর</strong> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-500 italic">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}