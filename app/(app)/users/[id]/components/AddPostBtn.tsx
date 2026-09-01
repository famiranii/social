"use client";

import { api } from "@/app/components/lib/api";
import { handleAddImage } from "@/store/featurs/getUsersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import LogoutButton from "@/app/components/Logout";

export default function AddPostBtn() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const reduxUserId = useAppSelector((state) => state.userInfo.userInfo.id);

  const profileId = params.id;

  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(reduxUserId);
  console.log(profileId);

  if (reduxUserId?.toString() !== profileId) return null;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!reduxUserId) {
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", reduxUserId.toString());

      const data: { message: string; error: boolean; data: string } =
        await api.post("upload", formData);

      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(handleAddImage(data.data));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload image.");
    }

    e.target.value = "";
  };

  return (
    <div>
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <button
          onClick={handleButtonClick}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1v14M1 8h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Post
        </button>
      </div>
      <LogoutButton />
    </div>
  );
}
