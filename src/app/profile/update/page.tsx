"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("সাইন ইন করুন");
      router.push("/signin?redirect=/profile/update");
    }
    if (session) setName(session.user.name || "");
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) throw new Error(error.message || "আপডেট ব্যর্থ");
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "আপডেট ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="text-center py-20">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h1 className="text-xl font-bold mb-4">তথ্য আপডেট করুন</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-2.5 rounded-lg font-medium"
            >
              {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              বাতিল
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}