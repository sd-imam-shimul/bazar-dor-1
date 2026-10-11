export interface Product {
  id: number | string;
  name: string;
  slug: string;
  emoji: string;
  unit: string;
  price: number;
  previousPrice?: number;
  change: number;
  category: string;
  description?: string;
  markets?: {
    bazar: string;
    district: string;
    min: number;
    max: number;
    avg: number;
  }[];
}

export const fallbackProducts: Product[] = [
  { id: 1, name: "স্বর্ণমাছি চাল", slug: "shornomashi-chal", emoji: "🍚", unit: "প্রতি কেজি", price: 148, change: 2.1, category: "chal" },
  { id: 2, name: "মিনিকেট চাল", slug: "miniket-chal", emoji: "🍚", unit: "প্রতি কেজি", price: 99, change: -2.9, category: "chal" },
  { id: 3, name: "নাজির চাল", slug: "nazir-chal", emoji: "🍚", unit: "প্রতি কেজি", price: 98, change: 0, category: "chal" },
  { id: 4, name: "বাসমতি চাল", slug: "basmati-chal", emoji: "🍚", unit: "প্রতি কেজি", price: 66, change: 0.8, category: "chal" },
  { id: 5, name: "সরু চাল", slug: "shoru-chal", emoji: "🍚", unit: "প্রতি কেজি", price: 142, change: 2.3, category: "chal" },
  { id: 6, name: "মোটা চাল", slug: "mota-chal", emoji: "🍚", unit: "প্রতি কেজি", price: 135, change: 0, category: "chal" },
  { id: 7, name: "ডাল", slug: "dal", emoji: "🫘", unit: "প্রতি কেজি", price: 135, change: 1.5, category: "dal" },
  { id: 8, name: "মসুর ডাল", slug: "moshur-dal", emoji: "🫘", unit: "প্রতি কেজি", price: 142, change: 2.3, category: "dal" },
  { id: 9, name: "ছোলা", slug: "chola", emoji: "🫘", unit: "প্রতি কেজি", price: 120, change: -2.8, category: "dal" },
  { id: 10, name: "তেল", slug: "tel", emoji: "🫙", unit: "প্রতি লিটার", price: 192, change: 2.4, category: "tel" },
  { id: 11, name: "সরিষার তেল", slug: "shorishar-tel", emoji: "🫙", unit: "প্রতি লিটার", price: 215, change: 3.8, category: "tel" },
  { id: 12, name: "সয়াবিন তেল", slug: "soyabin-tel", emoji: "🫙", unit: "প্রতি লিটার", price: 168, change: -1.2, category: "tel" },
  { id: 13, name: "সবজি", slug: "shobji", emoji: "🥬", unit: "প্রতি কেজি", price: 50, change: -3.2, category: "shobji" },
  { id: 14, name: "কাঁচামরিচ", slug: "kachamorich", emoji: "🌶️", unit: "প্রতি কেজি", price: 92, change: -3.8, category: "shobji" },
  { id: 15, name: "আলু", slug: "alu", emoji: "🥔", unit: "প্রতি কেজি", price: 30, change: -0.2, category: "shobji" },
  { id: 16, name: "পেঁয়াজ", slug: "peyaj", emoji: "🧅", unit: "প্রতি কেজি", price: 98, change: 4.5, category: "shobji" },
  { id: 17, name: "রসুন", slug: "roshun", emoji: "🧄", unit: "প্রতি কেজি", price: 125, change: -7.8, category: "shobji" },
  { id: 18, name: "বেগুন", slug: "begun", emoji: "🍆", unit: "প্রতি কেজি", price: 88, change: 8.8, category: "shobji" },
  { id: 19, name: "টমেটো", slug: "tomato", emoji: "🍅", unit: "প্রতি কেজি", price: 78, change: 0, category: "shobji" },
  { id: 20, name: "মাছ", slug: "mach", emoji: "🐟", unit: "প্রতি কেজি", price: 87, change: 8.0, category: "mach" },
  { id: 21, name: "ইলিশ মাছ", slug: "ilish-mach", emoji: "🐟", unit: "প্রতি কেজি", price: 1850, change: 0.8, category: "mach" },
  { id: 22, name: "কাতলা মাছ", slug: "katla-mach", emoji: "🐟", unit: "প্রতি কেজি", price: 83, change: -8.8, category: "mach" },
  { id: 23, name: "তেলাপিয়া", slug: "telapia", emoji: "🐟", unit: "প্রতি কেজি", price: 36, change: 0, category: "mach" },
  { id: 24, name: "পাঙাশ মাছ", slug: "pangash-mach", emoji: "🐟", unit: "প্রতি কেজি", price: 60, change: 1.2, category: "mach" },
  { id: 25, name: "মাংস", slug: "mangsho", emoji: "🍗", unit: "প্রতি কেজি", price: 225, change: -4.0, category: "mangsho" },
  { id: 26, name: "মুরগির মাংস", slug: "murgir-mangsho", emoji: "🍗", unit: "প্রতি কেজি", price: 225, change: -4.0, category: "mangsho" },
  { id: 27, name: "গরুর মাংস", slug: "gorur-mangsho", emoji: "🥩", unit: "প্রতি কেজি", price: 750, change: -1.2, category: "mangsho" },
  { id: 28, name: "খাসির মাংস", slug: "khashir-mangsho", emoji: "🥩", unit: "প্রতি কেজি", price: 1290, change: 0, category: "mangsho" },
  { id: 29, name: "হাঁসের মাংস", slug: "hasher-mangsho", emoji: "🦆", unit: "প্রতি কেজি", price: 285, change: -0.8, category: "mangsho" },
  { id: 30, name: "ডিম", slug: "dim", emoji: "🥚", unit: "প্রতি ডজন", price: 158, change: 0.6, category: "dim-murgi" },
  { id: 31, name: "মাছের ডিম", slug: "macher-dim", emoji: "🥚", unit: "প্রতি ডজন", price: 185, change: 0.6, category: "dim-murgi" },
  { id: 32, name: "মাখন", slug: "makhon", emoji: "🧈", unit: "প্রতি পিস", price: 180, change: 0.6, category: "mashla" },
  { id: 33, name: "মধু", slug: "madhu", emoji: "🍯", unit: "প্রতি লিটার", price: 102, change: 3.0, category: "mashla" },
];

export const fallbackCategories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🫙" },
  { slug: "shobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
  { slug: "dim-murgi", name: "ডিম-মুরগি", icon: "🥚" },
  { slug: "mashla", name: "মশলা", icon: "🌶️" },
];