"use client";

import { Heart, Star } from "lucide-react";
import ChatIconBtn from "./btns/ChatIconBtn";
import { User } from "@/types/user";
import { useAppDispatch } from "@/store/hooks/redux";
import { likeUserApi, saveUserApi } from "@/store/featurs/userActionsSlice";

type Props = { user: User };

export default function UserActions({ user }: Props) {
  const dispatch = useAppDispatch();

  const likeIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(likeUserApi(user.id));
  };

  const saveIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(saveUserApi(user.id));
  };

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-gray-800/30 border border-white/10 backdrop-blur-md">
      {/* Message */}
      <div className="flex items-center justify-center w-11 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 transition-all duration-200">
        <ChatIconBtn user={user} />
      </div>
      {/* Like */}
      <button
        onClick={likeIconClickHandler}
        aria-label={user.is_liked ? "Unlike" : "Like"}
        className={`
    group relative flex items-center justify-center gap-1.5 px-3 h-12 rounded-xl transition-all duration-200
    ${
      user.is_liked
        ? "bg-rose-500/20 border border-rose-500/40"
        : "bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30"
    }
  `}
      >
        <Heart
          size={18}
          className="transition-transform duration-200 group-hover:scale-110"
          color="#FB7185"
          fill={user.is_liked ? "#FB7185" : "none"}
        />
        <span className="text-xs font-medium text-rose-300">
          {user.like_count || 0}
        </span>
      </button>

      {/* Save */}
      <button
        onClick={saveIconClickHandler}
        aria-label={user.is_saved ? "Unsave" : "Save"}
        className={`
          group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
          ${
            user.is_saved
              ? "bg-amber-500/20 border border-amber-500/40"
              : "bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30"
          }
        `}
      >
        <Star
          size={18}
          className="transition-transform duration-200 group-hover:scale-110"
          color="#FCD34D"
          fill={user.is_saved ? "#FCD34D" : "none"}
        />
      </button>
    </div>
  );
}
