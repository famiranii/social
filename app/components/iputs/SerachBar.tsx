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

    const basePath = pathname.startsWith("/admin") ? "/admin/users" : "";

    router.push(
      `${basePath}/users/none?username=${encodeURIComponent(username)}`,
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search by username"
        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
      />

      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
