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

  return (
    <div
      onClick={imageClicked}
      className="relative h-36 w-36 cursor-pointer overflow-hidden rounded-xl md:h-52 md:w-52"
    >
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE_URL + image.image}
        alt="User image"
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 144px, 208px"
      />
    </div>
  );
}
