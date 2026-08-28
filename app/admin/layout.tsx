"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { label: "Dashboard", icon: "⊞", href: "/admin" },
    { label: "Clients", icon: "👥", href: "/admin/users" },
    { label: "map", icon: "👥", href: "/admin/map" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-900 px-4 lg:hidden">
        <div>
          <h1 className="text-lg font-bold">Admin Pannel</h1>
          <p className="text-[10px] text-slate-500">Management Console</p>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-xl hover:bg-white/10"
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-white/10 bg-slate-900
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Nexus Admin</h1>

            <p className="mt-1 text-xs text-slate-500">Management Console</p>
          </div>

          {/* Close button - mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map(({ label, icon, href }) => {
              const active = pathname === href;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-indigo-600 font-medium text-white"
                      : "text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span className="w-5 text-center">{icon}</span>
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Admin User */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                Admin User
              </p>

              <p className="truncate text-xs text-slate-500">System Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen lg:pl-64">
        <div className="w-full p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
