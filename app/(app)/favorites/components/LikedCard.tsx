import { User } from "@/types/user";
import { MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LikedCard({
  user,
  onUnlike,
}: {
  user: User;
  onUnlike: (id: number) => void;
}) {
  const imgSrc = user.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${user.image}`
    : null;

  return (
    <div className="group relative rounded-2xl border border-white/8 overflow-hidden bg-[#0d1117] hover:border-indigo-500/30 transition-colors">
      <div className="relative h-20">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="cover"
            fill
            className="object-cover object-top opacity-40 group-hover:opacity-60 transition-opacity"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 to-rose-900/60" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent" />

        <button
          onClick={() => onUnlike(user.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center hover:bg-yellow-400/20 hover:border-yellow-400/40 transition-all opacity-0 group-hover:opacity-100"
          title="Unsave"
        >
          ⭐
        </button>
      </div>

      <div className="relative px-5 -mt-8 flex items-end gap-3">
        <div className="relative w-14 h-14 rounded-xl border-2 border-[#0d1117] overflow-hidden shadow-lg shrink-0">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={user.username}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center text-lg font-bold text-white">
              {user.first_name?.[0] ?? "?"}
            </div>
          )}
        </div>

        <div className="pb-1 min-w-0">
          <h3 className="font-bold text-white text-sm truncate">
            {user.first_name} {user.last_name}
          </h3>

          <p className="text-xs text-indigo-400 truncate">@{user.username}</p>
        </div>
      </div>

      <div className="h-40 flex flex-col justify-between px-5 pt-3 pb-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {user.city && (
            <span className="text-[10px] text-slate-400 bg-white/6 border border-white/8 rounded-full px-2 py-0.5">
              📍 {user.city}
            </span>
          )}

          {user.age && (
            <span className="text-[10px] text-slate-400 bg-white/6 border border-white/8 rounded-full px-2 py-0.5">
              🎂 {user.age}
            </span>
          )}

          {user.job && (
            <span className="text-[10px] text-slate-400 bg-white/6 border border-white/8 rounded-full px-2 py-0.5 truncate max-w-[100px]">
              💼 {user.job}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 leading-5 line-clamp-2 mb-4 h-10">
          {user?.biography}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/${user.id}`}
            className="flex-1 text-center py-2 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg,#6366f1,#818CF8)",
            }}
          >
            View profile
          </Link>

          <Link
            href={`/chat?id=${user.id}`}
            className="w-9 h-9 rounded-xl border border-indigo-500/25 bg-indigo-500/10 flex items-center justify-center text-indigo-300 hover:bg-indigo-500/20 transition-colors shrink-0"
            title="Message"
          >
            <MessageSquareIcon width={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
