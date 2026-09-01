"use client";

import { useEffect, useState } from "react";
import BiggerPersonalCard from "./BiggerPersonalCard";
import ImageCard from "./ImageCard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Loading from "@/app/components/Loading";
import { getSingleUserInfoApi } from "@/store/featurs/getUsersSlice";
import { toast } from "sonner";

export default function PersonalGallery() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userId = params.id;
  const username = searchParams.get("username");

  const status = useAppSelector((state) => state.users.status);
  const userInfo = useAppSelector((state) => state.users.singleUser);
  const images = useAppSelector((state) => state.users.images);
  const image = useAppSelector((state) => state.userInfo.userInfo.image) || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfos = async () => {
      setLoading(true);

      try {
        if (userId && typeof userId === "string" && userId !== "none") {
          await dispatch(
            getSingleUserInfoApi({
              id: Number(userId),
            }),
          );
        } else if (username) {
          await dispatch(
            getSingleUserInfoApi({
              username,
            }),
          );
        }
      } finally {
        setLoading(false);
      }
    };

    getUserInfos();
  }, [dispatch, userId, username]);

  useEffect(() => {
    if (status !== "user-not-found") {
      return;
    }

    toast.error("There isn't any user with this username or id");

    router.push("/");
  }, [status, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading width={80} />
      </div>
    );
  }

  if (status === "user-not-found") {
    return null;
  }

  return (
    <div className="md:h-[calc(100vh-72px)] flex flex-col md:flex-row items-center px-8 md:gap-20">
      <div>
        <BiggerPersonalCard
          user={userInfo}
          image={images[0]?.image}
          profileImage={image}
        />
      </div>

      <div className="h-full flex-1 py-8">
        <div className="h-full md:overflow-y-auto flex flex-wrap gap-4 justify-center">
          {images.map((image, i) => (
            <ImageCard key={i} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
