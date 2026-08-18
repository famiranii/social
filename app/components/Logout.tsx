"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/redux";
import { logout } from "@/store/featurs/authSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // حذف token از cookie

    // پاک کردن اطلاعات auth از Redux
    dispatch(logout());

    // انتقال به login
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full py-3 rounded-xl font-medium text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>
  );
}
