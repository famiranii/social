import ChatIconBtn from "@/app/components/btns/ChatIconBtn";
import ChatIcon from "@/public/icons/ChatIcon";
import RedHeartIcon from "@/public/icons/RedHeartIcon";
import StarIcon from "@/public/icons/StarIcon";
import { User } from "@/types/user";
import Image from "next/image";

export default function BiggerPersonalCard({ user }: { user: User }) {
  return (
    <div
      className="flex flex-col items-center gap-2
      w-80 md:w-100 h-140 rounded-2xl bg-amber-50
      shadow-[5px_5px_10px_rgba(0,0,0,0.5)]
    "
    >
      {/* IMAGE */}
      <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
        <Image
          src={
            user?.image
              ? process.env.NEXT_PUBLIC_API_URL + user?.image
              : "/images/random-image.jpg"
          }
          alt="profile"
          fill
          className="object-cover"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="w-28 bg-gray-700 rounded-3xl flex items-center justify-around py-2">
        <RedHeartIcon />
        <ChatIconBtn />
        <StarIcon />
      </div>

      {/* NAME */}
      <div>
        <p className="text-black font-bold text-2xl text-center">
          {user?.first_name || user?.username}
        </p>

        <p className="text-gray-500 text-sm text-center">@{user?.username}</p>
      </div>

      {/* user */}
      <div className="px-4">
        <p className="text-black text-xs text-center leading-5">
          {user?.biography ||
            "This usersn't written a bio yet. Explore their profile to learn more."}
        </p>
      </div>

      {/* EXTRA user */}
      <div className="flex gap-3 text-xs text-gray-600 mt-2">
        {user?.city && <span>📍 {user.city}</span>}
        {user?.country && <span>🌍 {user.country}</span>}
        {user?.age && <span>🎂 {user.age}</span>}
      </div>
    </div>
  );
}
