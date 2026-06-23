"use client";

import { openModal } from "@/store/featurs/uiSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import { UserImage } from "@/types/userImage";
import Image from "next/image";

export default function ImageCard({ image }: { image: UserImage }) {
  const dispatch = useAppDispatch();
  const imageClicked = () => {
    dispatch(openModal("photo-slider"));
  };
  console.log(
    process.env.NEXT_PUBLIC_IMAGE_URL +
      "var/www/api/app/public/storage/" +
      image.image,
  );

  return (
    <div className="cursor-pointer w-30 md:w-50" onClick={imageClicked}>
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + image.image}
        width={200}
        height={200}
        alt="info"
        className="rounded-lg"
      />
    </div>
  );
}
