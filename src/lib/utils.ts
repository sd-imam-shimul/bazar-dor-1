export const toBengaliNumber = (num: number | string): string => {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bn[parseInt(d)]);
};

export const formatBengaliPrice = (
  price: number | string | undefined | null
): string => {
  if (price === undefined || price === null || price === "") return "০";
  const num = Number(price);
  if (isNaN(num)) return "০";
  return toBengaliNumber(num.toLocaleString("en-IN"));
};

export const getBengaliDate = (date: Date = new Date()): string => {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const day = days[date.getDay()];
  const d = toBengaliNumber(date.getDate());
  const m = months[date.getMonth()];
  const y = toBengaliNumber(date.getFullYear());
  return `${day}, ${d} ${m}, ${y}`;
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return "text-green-600 bg-green-50";
  if (change < 0) return "text-red-600 bg-red-50";
  return "text-gray-600 bg-gray-100";
};

export const getChangeIcon = (change: number): string => {
  if (change > 0) return "▲";
  if (change < 0) return "▼";
  return "—";
};

export const safeNumber = (val: unknown, fallback = 0): number => {
  const n = Number(val);
  return isNaN(n) ? fallback : n;
};