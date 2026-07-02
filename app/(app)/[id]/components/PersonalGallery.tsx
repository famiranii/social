"use client";
import { useEffect, useState } from "react";
import BiggerPersonalCard from "./BiggerPersonalCard";
import ImageCard from "./ImageCard";
import { api } from "@/app/components/lib/api";
import { useParams } from "next/navigation";
import { User } from "@/types/user";
import { UserImage } from "@/types/userImage";
import { useAppDispatch } from "@/store/hooks/redux";
import { setImagesGallery } from "@/store/featurs/imagesGallerySlice";

export default function PersonalGallery() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const userId = params.id;
  const [images, setImages] = useState<UserImage[]>([]);
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    age: 0,
    birthday: "",
    job: "",
    country: "",
    city: "",
    sex: "",
    biography: "",
    lat: "",
    lon: "",
    ip: null,
    image: "",
  });
  useEffect(() => {
    const getImages = async () => {
      try {
        const response: any = await api.post("images", {
          user_id: userId,
        });
        setImages(response.data);
        dispatch(setImagesGallery(response.data));
      } catch (error) {}
    };
    const getUserInfo = async () => {
      try {
        const response: any = await api.post("user", {
          id: userId,
        });
        setUserInfo(response.user);
      } catch (error) {}
    };

    getImages();
    getUserInfo();
  }, []);
  console.log(images[1]);

  return (
    <div className="md:h-[calc(100vh-72px)] flex flex-col md:flex-row items-center px-8 md:gap-20">
      <div>
        <BiggerPersonalCard user={userInfo} image={images[1]?.image} />
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
