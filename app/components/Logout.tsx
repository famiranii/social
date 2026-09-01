"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/redux";
import { logout } from "@/store/featurs/authSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-2.5
        rounded-2xl
        border
        border-rose-500/20
        bg-rose-500/5
        px-4
        py-3
        text-sm
        font-semibold
        text-rose-400
        shadow-sm
        transition-all
        duration-200
        hover:border-rose-500/40
        hover:bg-rose-500/10
        hover:text-rose-300
        active:scale-[0.98]
      "
    >
      <LogOut
        size={18}
        strokeWidth={2}
        className="
          transition-transform
          duration-200
          group-hover:-translate-x-0.5
        "
      />

      <span>Logout</span>
    </button>
  );
}
