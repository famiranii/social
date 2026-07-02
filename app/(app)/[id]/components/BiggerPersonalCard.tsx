import ChatIconBtn from "@/app/components/btns/ChatIconBtn";
import RedHeartIcon from "@/public/icons/RedHeartIcon";
import StarIcon from "@/public/icons/StarIcon";
import { User } from "@/types/user";
import Image from "next/image";
import dynamic from "next/dynamic";

const AddPostBtn = dynamic(() => import("./AddPostBtn"), {
  ssr: false,
});

export default function BiggerPersonalCard({
  user,
  image,
}: {
  user: User;
  image: string;
}) {
  console.log(image);

  return (
    <div
      className="
      w-80 md:w-96
      overflow-hidden
      rounded-3xl
      bg-white
      shadow-xl
      border border-gray-200
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      max-h-150
    "
    >
      {/* Cover */}
      <div className="relative h-56">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${user.image}`}
          alt="profile"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Floating avatar */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${image}`}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="pt-16 px-6 pb-6 flex flex-col items-center overflow-y-scroll h-80
"
      >
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-900">
          {user?.first_name} {user?.last_name}
        </h2>

        <p className="text-gray-500">@{user?.username}</p>

        {/* Bio */}
        <p className="mt-4 text-center text-sm text-gray-600 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, porro
          commodi, voluptatum veniam laborum repellendus sit ipsum officia ullam
          dolore nesciunt voluptas praesentium doloremque eos beatae. Nobis
          neque quisquam minima quos iste, itaque iusto. Veniam alias
          exercitationem nobis, optio officiis facilis commodi placeat!
          Repudiandae inventore, placeat obcaecati alias accusantium nobis
          voluptatem atque aliquid ut sapiente pariatur iste expedita quibusdam
          doloremque. Obcaecati modi iusto explicabo odit aperiam vero sed quasi
          facere, atque, laudantium laboriosam, eius itaque voluptates laborum
          quos quis quae illum ratione totam adipisci. Libero enim sint tempore
          facere veritatis error dolores voluptatem, hic esse culpa delectus
          inventore! Corporis, voluptas?
        </p>

        {/* Info */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {user?.city && (
            <span className="rounded-full bg-gray-300 px-3 py-1 text-xs">
              📍 {user.city}
            </span>
          )}

          {user?.country && (
            <span className="rounded-full bg-gray-300 px-3 py-1 text-xs">
              🌍 {user.country}
            </span>
          )}

          {user?.age && (
            <span className="rounded-full bg-gray-300 px-3 py-1 text-xs">
              🎂 {user.age}
            </span>
          )}
        </div>
        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button className="h-12 w-12 rounded-full bg-red-100 hover:bg-red-200 transition flex items-center justify-center">
            <RedHeartIcon />
          </button>

          <div className="h-12 w-12 rounded-full bg-blue-100 hover:bg-blue-200 transition flex items-center justify-center">
            <ChatIconBtn user={user} />
          </div>

          <button className="h-12 w-12 rounded-full bg-yellow-100 hover:bg-yellow-200 transition flex items-center justify-center">
            <StarIcon />
          </button>
        </div>

        <div className="mt-8 w-full">
          <AddPostBtn />
        </div>
      </div>
    </div>
  );
}
