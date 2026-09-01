"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import { saveUserApi } from "@/store/featurs/userActionsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import {
  getFilteredUsersApi,
  removeUserById,
} from "@/store/featurs/getUsersSlice";
import LikedCard from "./components/LikedCard";

export default function Page() {
  const users = useAppSelector((state) => state.users.users);

  const status = useAppSelector((state) => state.users.status);
  const page = useAppSelector((state) => state.users.page);
  const hasMore = useAppSelector((state) => state.users.hasMore);

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      await dispatch(
        getFilteredUsersApi({
          page: 0,
          is_saved: true,
          country: "",
        }),
      );

      setLoading(false);
    };

    getUsers();
  }, [dispatch]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && status !== "loading" && hasMore) {
          dispatch(
            getFilteredUsersApi({
              page: page + 1,
              is_saved: true,
              country: "Albania",
            }),
          );
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [dispatch, page, status, hasMore]);

  const handleUnSave = async (userId: number) => {
    await dispatch(saveUserApi(userId))
      .unwrap()
      .then(() => {
        dispatch(removeUserById(userId));
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading width={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-400 mb-2">
          Your list
        </p>

        <h1 className="text-3xl font-extrabold text-white">
          People you{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg,#FB7185,#818CF8)",
            }}
          >
            Saved
          </span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {users.length} {users.length === 1 ? "person" : "people"} saved
        </p>
      </div>

      {users.length === 0 && status === "success" && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-3xl">
            ⭐
          </div>

          <h2 className="text-lg font-bold text-white">No likes yet</h2>

          <p className="text-sm text-slate-400 max-w-xs">
            When you like someone their profile shows up here. Start exploring
            to find your people.
          </p>

          <Link
            href="/explore"
            className="mt-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg,#6366f1,#818CF8)",
              boxShadow: "0 4px 20px rgba(99,102,241,.3)",
            }}
          >
            Explore people
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <LikedCard key={user.id} user={user} onUnlike={handleUnSave} />
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="w-full flex justify-center py-10">
          {status === "loading" && <Loading width={40} />}
        </div>
      )}
    </div>
  );
}
