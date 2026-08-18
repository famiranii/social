"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { memo } from "react";
import UserActions from "../UserActions";

function PersonalCard({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/users/" + user.id)}
      className="group relative w-72 h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/8 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 hover:shadow-2xl"
    >
      {/* Image */}
      {user.image ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${user.image}`}
          alt="card"
          loading="lazy"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-rose-900" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

      {/* Actions */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-10 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <UserActions user={user} />
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {/* Name */}
        <div className="flex items-end justify-between gap-2 mb-1">
          <h3 className="text-lg font-extrabold leading-tight tracking-tight drop-shadow">
            {user?.first_name} {user?.last_name}
          </h3>
          {user?.age && (
            <span className="text-sm font-semibold text-white/70 shrink-0 mb-0.5">
              {user.age}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {user?.job && (
            <span className="text-[10px] font-medium bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 text-white/80">
              💼 {user.job}
            </span>
          )}
          {user?.country && (
            <span className="text-[10px] font-medium bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 text-white/80">
              📍 {user.country}
            </span>
          )}
        </div>

        {/* Bio */}
        {user?.biography && (
          <p className="text-xs text-white/60 leading-5 line-clamp-2 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
            {user.biography}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(PersonalCard);
