"use client";

import Loading from "@/app/components/Loading";
import { getUsersApi } from "@/store/featurs/getUsersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Link from "next/link";
import { useEffect, useRef } from "react";
import UsersCard from "../components/UsersCard";
import SearchBar from "@/app/components/iputs/SerachBar";

export default function Page() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const page = useAppSelector((state) => state.users.page);
  const hasMore = useAppSelector((state) => state.users.hasMore);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // صفحه اول
  useEffect(() => {
    dispatch(getUsersApi({ page: 0 }));
  }, [dispatch]);

  // Infinite Scroll
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && status !== "loading" && hasMore) {
          dispatch(
            getUsersApi({
              page: page + 1,
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

  return (
    <div className="font-sans p-8">
      {/* Search */}
      <div className="mb-10 w-full flex justify-center">
        <div className="w-88">
          <SearchBar />
        </div>
      </div>

      {/* Users */}
      <div className="flex flex-wrap gap-6 justify-center">
        {users.length === 0 && status === "success" && (
          <div className="bg-red-800 w-100 text-center p-10">
            <p>there isnt any user for this filter</p>
          </div>
        )}

        {users.map((user) => (
          <Link href={"/admin/users/" + user.id} key={user.id}>
            <UsersCard user={user} />
          </Link>
        ))}
      </div>

      {/* Loading / Infinite Scroll trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="w-full flex justify-center py-10">
          {status === "loading" && <Loading width={40} />}
        </div>
      )}
    </div>
  );
}
