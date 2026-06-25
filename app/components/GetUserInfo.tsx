"use client";

import { getUserInfoApi } from "@/store/featurs/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useEffect } from "react";

export default function GetUserInfo() {
  const dispatch = useAppDispatch();
  const reduxId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    const localId =
      typeof window !== "undefined" ? Number(localStorage.getItem("id")) : null;

    const id = reduxId || localId;

    if (id) {
      dispatch(getUserInfoApi({ id }));
    }
  }, [reduxId, dispatch]);

  return null;
}
