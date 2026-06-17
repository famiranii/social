"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Matches", href: "/matches" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              text-sm transition
              ${
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-white/70 hover:text-white"
              }
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
