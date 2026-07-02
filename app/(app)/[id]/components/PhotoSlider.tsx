"use client";

import BackwardIcon from "@/public/icons/BackwardIcon";
import { closeModal } from "@/store/featurs/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PhotoSlider() {
  const isOpen = useAppSelector(
    (state) =>
      state.ui.modals.find((m) => m.modalName === "photo-slider")?.isOpen,
  );
  const images = useAppSelector((state) => state.imagesGallery.images);

  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 5;
    return window.innerWidth < 768 ? 3 : 5;
  };

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);
  const VISIBLE = getVisibleCount();

  const nextThumbs = () => {
    setThumbStart((prev) => Math.min(prev + VISIBLE, images.length - VISIBLE));
  };

  const prevThumbs = () => {
    setThumbStart((prev) => Math.max(prev - VISIBLE, 0));
  };

  const close = () => {
    dispatch(closeModal("photo-slider"));
  };

  // ESC key support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  if (!isOpen) return null;

  const visibleImages = images.slice(thumbStart, thumbStart + VISIBLE);

  return (
    <div
      onClick={close}
      className="fixed inset-0 bg-gray-600/50 backdrop-blur-md flex justify-center items-center z-50"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-80 md:w-180">
        {/* BACK BUTTON */}
        <button
          className="absolute left-10 top-10 border rounded-full p-2 hover:border-gray-400 hover:text-gray-400"
          onClick={close}
        >
          <BackwardIcon prop={{ width: 60 }} />
        </button>

        <div className="relative w-full h-90 rounded-2xl overflow-hidden bg-black">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${images[index].image}`}
            alt="main"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={prevThumbs}
            className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {visibleImages.map((img, i) => {
              const realIndex = thumbStart + i;

              return (
                <div
                  key={realIndex}
                  onClick={() => setIndex(realIndex)}
                  className={`relative w-15 h-15 md:w-30 md:h-20 cursor-pointer rounded-md overflow-hidden border-2 ${
                    realIndex === index ? "border-white" : "border-transparent"
                  }`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${img.image}`}
                    alt="thumb"
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={nextThumbs}
            className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
