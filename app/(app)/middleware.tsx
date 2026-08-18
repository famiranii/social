"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks/redux";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/login");
  //   }
  // }, [token, router]);

  // if (!token) return null; 

  return <>{children}</>;
}