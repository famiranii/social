"use client";

import EllipsisDropdown from "@/app/components/ElipsisDropdown";
import { api } from "@/app/components/lib/api";
import { handleRemoveImage } from "@/store/featurs/getUsersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function ImagesBtn({ image }: { image: string }) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const reduxUserId = useAppSelector((state) => state.auth.userId);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = reduxUserId ?? localStorage.getItem("id") ?? "";
    setUserId(String(id));
  }, [reduxUserId]);
  const profileId = params.id?.toString();

  if (userId !== profileId) return null;

  const imageActionHandler = async (selected: string) => {
    if (selected === "set as profile") {
      try {
        const data: { message: string; error: boolean } = await api.post(
          "set/profile",
          { image },
        );

        if (data.error) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to upload image.",
        );
      }
    } else if (selected === "delete") {
      try {
        const data: { message: string; error: boolean } = await api.post(
          "delete/image",
          { image },
        );

        if (data.error) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          dispatch(handleRemoveImage(image));
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to upload image.",
        );
      }
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <EllipsisDropdown
        options={["delete", "set as profile"]}
        handleClicked={imageActionHandler}
      />
    </div>
  );
}
