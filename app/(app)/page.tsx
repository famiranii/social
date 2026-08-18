"use client";

import PersonalCard from "../components/Home/PersonalCard";
import {
  getFilteredUsersApi,
  getUsersApi,
} from "@/store/featurs/getUsersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Loading from "../components/Loading";
import SearchBar from "../components/iputs/SerachBar";
import { useEffect, useRef } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const selectedCountry = useAppSelector(
    (state) => state.users.selectedCountry,
  );

  const page = useAppSelector((state) => state.users.page);
  const hasMore = useAppSelector((state) => state.users.hasMore);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // گرفتن صفحه اول
  useEffect(() => {
    if (selectedCountry === "All") {
      dispatch(getUsersApi({ page: 0 }));
    }
  }, [dispatch]);

  // Infinite Scroll
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && status !== "loading" && hasMore) {
          if (selectedCountry === "All") {
            dispatch(
              getUsersApi({
                page: page + 1,
              }),
            );
          } else {
            dispatch(
              getFilteredUsersApi({
                page: page + 1,
                country: selectedCountry,
                is_saved: false,
              }),
            );
          }
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

  if (status === "loading" && users.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading width={60} />
      </div>
    );
  }

  return (
    <div className="font-sans p-8">
      <div className="mb-10 w-full flex justify-center">
        <div className="w-88">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {users.length === 0 && status === "success" && (
          <div className="bg-red-800 w-100 text-center p-10">
            <p>there isnt any user for this filter</p>
          </div>
        )}

        {users.map((user) => (
          <PersonalCard user={user} key={user.id} />
        ))}
      </div>

      {/* نقطه‌ای که برای pagination مشاهده می‌شود */}
      {hasMore && (
        <div ref={loadMoreRef} className="w-full flex justify-center py-10">
          {status === "loading" && <Loading width={40} />}
        </div>
      )}
    </div>
  );
}
