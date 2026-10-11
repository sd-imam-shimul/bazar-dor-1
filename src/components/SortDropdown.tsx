"use client";

import { toBengaliNumber } from "@/lib/utils";

export type SortOption = "default" | "low-high" | "high-low";

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">সাজান:</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:border-green-500"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-high">দাম: কম থেকে বেশি</option>
          <option value="high-low">দাম: বেশি থেকে কম</option>
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          ▾
        </span>
      </div>
    </div>
  );
}