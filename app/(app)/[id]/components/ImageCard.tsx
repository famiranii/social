"use client";

import { openModal } from "@/store/featurs/uiSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import Image from "next/image";

export default function ImageCard() {
  const dispatch = useAppDispatch();
  const imageClicked = () => {
    dispatch(openModal("photo-slider"));
  };
  return (
    <div className="cursor-pointer w-30 md:w-50" onClick={imageClicked}>
      <Image
        src="/images/random-image.jpg"
        width={200}
        height={200}
        alt="info"
        className="rounded-lg"
      />
    </div>
  );
}
