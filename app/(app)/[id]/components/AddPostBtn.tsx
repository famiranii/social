"use client";

import { api } from "@/app/components/lib/api";
import { useAppSelector } from "@/store/hooks/redux";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export default function AddPostBtn() {
  const params = useParams();
  const reduxUserId = useAppSelector((state) => state.auth.userId);

  const userId = String(reduxUserId || localStorage.getItem("id") || "");

  const profileId = params.id?.toString();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (userId !== profileId) return null;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", userId);

      const data: { message: string; error: boolean } = await api.post(
        "upload",
        formData,
      );

      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload image.");
    }

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <button
        onClick={handleButtonClick}
        className="w-24 bg-sky-500 text-white py-3 rounded-xl font-medium hover:bg-sky-600"
      >
        Add Post
      </button>
    </>
  );
}
