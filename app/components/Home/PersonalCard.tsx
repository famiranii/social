"use client";

import RedHeartIcon from "@/public/icons/RedHeartIcon";
import StarIcon from "@/public/icons/StarIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChatIconBtn from "../btns/ChatIconBtn";
import { User } from "@/types/user";

export default function PersonalCard({ user }: { user: User }) {

  const router = useRouter();

  const PersonalCardClicked = () => {
    router.push("/" + user.id);
  };
  const bio = user?.biography;
  const trimmed = bio?.slice(0, 120) + "...";

  return (
    <div className="p-1 bg-amber-50 rounded-2xl">
      <div
        onClick={PersonalCardClicked}
        className="
        group relative w-88 h-130
        rounded-2xl overflow-hidden
        shadow-lg cursor-pointer
        bg-black
      "
      >
        {/* IMAGE */}
        <Image
          src="/images/random-image.jpg"
          alt="card"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* DARK OVERLAY (always subtle, stronger on hover) */}
        <div className="absolute inset-0  from-black/70 via-black/20 to-transparent" />

        {/* ICONS (always visible) */}
        <div className="absolute top-2 flex items-center justify-center w-full ">
          <div className="gap-2 bg-gray-200/30 flex items-center rounded-full p-0.5">
            <RedHeartIcon />
            <ChatIconBtn />
            <StarIcon />
          </div>
        </div>

        {/* INFO PANEL (hidden until hover) */}
        <div
          className="
          absolute bottom-0 left-0 right-0
          p-4 text-white
          transform translate-y-10 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300
          bg-gray-900/40
        "
        >
          <p className="text-xl font-bold">
            {user?.first_name} {user?.last_name}
          </p>

          <p className="text-sm text-white/80 mt-1">
            {user?.job} • {user?.country} • {user?.age}
          </p>

          <p className="text-xs text-white/70 mt-2 line-clamp-3">{trimmed}</p>
        </div>
      </div>
    </div>
  );
}
