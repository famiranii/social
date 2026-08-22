"use client";

import { getUserInfoApi } from "@/store/featurs/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GetUserInfo() {
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const reduxId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    // صفحات عمومی
    if (pathname === "/login" || pathname === "/sign-up") {
      return;
    }

    const token = Cookies.get("token");

    // if (!token) return;

    const cookieId = Cookies.get("id")
      ? Number(Cookies.get("id"))
      : null;

    const id = reduxId || cookieId;

    if (id) {
      dispatch(getUserInfoApi({ id }));
    }
  }, [pathname, reduxId, dispatch]);

  return null;
}