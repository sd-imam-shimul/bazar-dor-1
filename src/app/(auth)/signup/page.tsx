"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({ name, email, password });
      if (error) throw new Error(error.message || "রেজিস্ট্রেশন ব্যর্থ");
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! সাইন ইন করুন");
      router.push("/signin");
    } catch (err: any) {
      toast.error(err.message || "রেজিস্ট্রেশন ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({ provider, callbackURL: "/" });
    } catch {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-sm text-gray-500">বিনামূল্যে সাইন আপ করুন এবং সব বিস্তারিত দেখুন</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">নাম</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার পুরো নাম"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ইমেইল</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-2.5 rounded-lg font-medium"
            >
              {loading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-xs text-gray-500">অথবা</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleSocial("google")} className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">
              <span>🔵</span> Google
            </button>
            <button onClick={() => handleSocial("github")} className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">
              <span>⚫</span> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-5">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-600 font-medium hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/" className="hover:text-green-600">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
}