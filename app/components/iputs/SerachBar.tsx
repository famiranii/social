"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    const username = query.trim();

    if (!username) return;

    const basePath = pathname.startsWith("/admin") ? "/admin" : "";

    router.push(
      `${basePath}/users/none?username=${encodeURIComponent(username)}`,
    );
  };

  return (
    <div className="relative w-full">


      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Find someone by username..."
        className="
      h-11 w-full
      rounded-full
      border border-slate-200
      bg-white
      pl-11 pr-11
      text-sm text-slate-800
      placeholder:text-slate-400
      shadow-sm
      outline-none
      transition-all duration-200
      hover:border-slate-300
      focus:border-indigo-400
      focus:ring-4 focus:ring-indigo-500/10
    "
      />

      {/* Search button */}
      <button
        type="button"
        onClick={handleSearch}
        className="
      absolute right-1.5 top-1/2
      flex h-8 w-8
      -translate-y-1/2
      items-center justify-center
      rounded-full
      bg-indigo-500
      text-white
      shadow-sm
      transition-all duration-200
      hover:bg-indigo-600
      active:scale-95
    "
        aria-label="Search"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
