"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) return <div className="text-center py-20">লোড হচ্ছে...</div>;
  if (!session) return null;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
              {session.user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="font-bold text-lg">{session.user.name}</h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm"
          >
            ↩ সাইন আউট
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold mb-3">তথ্য আপডেট</h3>
        <p className="text-sm text-gray-500 mb-4">আপনার নাম ও অন্যান্য তথ্য পরিবর্তন করুন</p>
        <Link
          href="/profile/update"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}