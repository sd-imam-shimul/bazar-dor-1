"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { getBengaliDate, formatBengaliPrice, toBengaliNumber } from "@/lib/utils";
import { fallbackProducts, fallbackCategories } from "@/lib/fallback";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন");
    router.push("/");
    router.refresh();
  };

  const tickerItems = fallbackProducts.slice(0, 12);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl">
            🛒
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">{getBengaliDate()}</p>
          </div>
        </Link>

        {!session ? (
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-2"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              সাইন আপ
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {session.user.name}
              </span>
              <span className="text-xs">▾</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                >
                  👤 আমার প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  ↩ সাইন আউট
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-1 overflow-x-auto">
          {fallbackCategories.map((cat) => {
            const active = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="flex gap-8 py-2 animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span>{p.emoji}</span>
              <span className="font-medium">{p.name}</span>
              <span className="text-gray-600">
                {formatBengaliPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
              </span>
              <span
                className={
                  p.change > 0
                    ? "text-green-600"
                    : p.change < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }
              >
                {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"}{" "}
                {toBengaliNumber(Math.abs(p.change).toFixed(1))}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}