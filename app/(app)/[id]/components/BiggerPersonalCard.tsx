import ChatIconBtn from "@/app/components/btns/ChatIconBtn";
import ChatIcon from "@/public/icons/ChatIcon";
import RedHeartIcon from "@/public/icons/RedHeartIcon";
import StarIcon from "@/public/icons/StarIcon";
import Image from "next/image";

export default function BiggerPersonalCard() {
  return (
    <div
      className="flex flex-col items-center gap-2
    w-80 md:w-100 h-140 rounded-2xl bg-amber-50
    shadow-[5px_5px_10px_rgba(0,0,0,0.5)]
  "
    >
      <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
        <Image
          src="/images/random-image.jpg"
          alt="card"
          fill
          className="object-fill"
        />
      </div>
      <div className="w-28 bg-gray-700 rounded-3xl flex items-center justify-around">
        <RedHeartIcon />
        <ChatIconBtn />
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
          rhoncus aenean vel elit scelerisque Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua Egestas purus viverra accumsan in nisl
          nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit
          scelerisque Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue
          mauris rhoncus aenean vel elit scelerisque Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua Egestas purus viverra accumsan in nisl
          nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit
          scelerisque
        </p>
      </div>
    </div>
  );
}
