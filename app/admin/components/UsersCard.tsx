"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { memo } from "react";

function UsersCard({ user }: { user: User }) {
  const router = useRouter();

  const imageUrl = user.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${user.image}`
    : null;

  return (
    <div
      onClick={() => router.push(`/admin/users/${user.id}`)}
      className="group h-165 w-80 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-500/10"
    >
      {/* Header */}
      <div className="relative h-80 w-80 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${user.first_name} ${user.last_name}`}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white">
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </div>
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* User ID */}
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
          ID #{user.id}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name + Status */}
        <div className="flex items-start justify-between gap-3 h-10">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-white">
              {user.first_name} {user.last_name}
            </h3>

            {user.username && (
              <p className="mt-0.5 truncate text-xs text-indigo-400">
                @{user.username}
              </p>
            )}
          </div>

          {/* Status */}
          {/* <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Active
          </span> */}
        </div>

        {/* User information */}
        <div className="mt-4 grid grid-cols-2 gap-2 h-28">
          <div className="min-w-0 rounded-lg bg-white/5 p-2.5">
            <p className="text-[9px] uppercase tracking-wider text-slate-500">
              Email
            </p>

            <p className="mt-1 truncate text-xs text-slate-300 h-4">{user.email}</p>
          </div>

          <div className="rounded-lg bg-white/5 p-2.5">
            <p className="text-[9px] uppercase tracking-wider text-slate-500">
              Age
            </p>

            <p className="mt-1 text-xs text-slate-300 h-4">{user.age}</p>
          </div>

          <div className="min-w-0 rounded-lg bg-white/5 p-2.5">
            <p className="text-[9px] uppercase tracking-wider text-slate-500">
              Job
            </p>

            <p className="mt-1 truncate text-xs text-slate-300 h-4">{user.job}</p>
          </div>

          <div className="min-w-0 rounded-lg bg-white/5 p-2.5">
            <p className="text-[9px] uppercase tracking-wider text-slate-500">
              Location
            </p>

            <p className="mt-1 truncate text-xs text-slate-300 h-4">
              {user.country}
            </p>
          </div>
        </div>

        {/* Biography */}
        <p className="mt-4 line-clamp-2 text-xs leading-5 text-slate-500 h-14">
          {user.biography && user.biography }
        </p>

        {/* Actions */}
        <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/users/${user.id}`);
            }}
            className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
          >
            View User
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add your edit action here
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(UsersCard);
