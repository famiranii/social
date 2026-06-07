"use client";
import ChatIcon from "@/public/icons/ChatIcon";
import RedHeartIcon from "@/public/icons/RedHeartIcon";
import StarIcon from "@/public/icons/StarIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PersonalCard() {
  const id = "Fakeid";
  const router = useRouter();
  const PersonalCardClicked = () => {
    router.push("/" + id);
  };
  return (
    <div
      className="flex flex-col items-center gap-2
    w-72 h-90 rounded-2xl bg-amber-50
    shadow-[5px_5px_10px_rgba(0,0,0,0.5)]
    cursor-pointer
  "
      onClick={PersonalCardClicked}
    >
      <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
        <Image
          src="/images/random-image.jpg"
          alt="card"
          fill
          className="object-fill"
        />
      </div>
      <div className="w-28 bg-gray-700 rounded-3xl flex items-center justify-around">
        <RedHeartIcon />
        <ChatIcon />
        <StarIcon />
      </div>
      <div>
        <p className="text-black font-bold text-2xl">Jakob Tamson</p>
      </div>
      <div className="px-4">
        <p className="text-black text-xs text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas
          purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris
          rhoncus aenean vel elit scelerisque
        </p>
      </div>
    </div>
  );
}
