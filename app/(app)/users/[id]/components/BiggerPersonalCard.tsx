import { User } from "@/types/user";
import Image from "next/image";
import dynamic from "next/dynamic";
import UserActions from "@/app/components/UserActions";
import { useAppSelector } from "@/store/hooks/redux";
import { useParams } from "next/navigation";

const AddPostBtn = dynamic(() => import("./AddPostBtn"), { ssr: false });

export default function BiggerPersonalCard({
  user,
  image,
  profileImage,
}: {
  user: User;
  image: string;
  profileImage: string;
}) {
  const imgSrc = `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${image}`;
  const pImgSrc = `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${profileImage}`;
  const reduxId = useAppSelector((state) => state.userInfo.userInfo.id);
  const params = useParams();
  const id = params.id;
  return (
    <div className="relative w-80 md:w-88 rounded-3xl overflow-hidden shadow-2xl bg-[#0d1117] border border-white/10 flex flex-col h-[600px]">
      {/* Cover photo */}
      <div className="relative h-52 shrink-0">
        {image ? (
          <Image
            src={pImgSrc}
            alt="cover"
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-rose-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-10">
        <div className="relative w-24 h-24 rounded-full border-4 border-[#0d1117] overflow-hidden shadow-xl">
          {image ? (
            <Image src={imgSrc} alt="avatar" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center text-2xl font-bold text-white">
              {user?.first_name?.[0]}
            </div>
          )}
        </div>
        {/* <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0d1117]" /> */}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col items-center pt-14 gap-1">
        <h2 className="text-xl font-bold text-white tracking-tight">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-sm text-indigo-400 font-medium">@{user?.username}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {user?.city && (
            <span className="flex items-center gap-1 text-xs text-slate-300 bg-white/8 border border-white/10 rounded-full px-3 py-1">
              📍 {user.city}
              {user?.country ? `, ${user.country}` : ""}
            </span>
          )}
          {user?.age && (
            <span className="flex items-center gap-1 text-xs text-slate-300 bg-white/8 border border-white/10 rounded-full px-3 py-1">
              🎂 {user.age}
            </span>
          )}
          {user?.job && (
            <span className="flex items-center gap-1 text-xs text-slate-300 bg-white/8 border border-white/10 rounded-full px-3 py-1">
              💼 {user.job}
            </span>
          )}
        </div>

        {user?.biography && (
          <p className="mt-4 text-center text-sm text-slate-400 leading-6">
            {user.biography}
          </p>
        )}

        {user?.hobbies?.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {user.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="text-xs font-medium text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 rounded-full px-3 py-1"
              >
                {hobby}
              </span>
            ))}
          </div>
        )}

        <div className="w-full h-px bg-white/8 my-5" />

        {reduxId.toString() !== id?.toString() && (
          <div className="flex items-center gap-4">
            <UserActions user={user} />
          </div>
        )}

        <div className="my-5 w-full">
          <AddPostBtn />
        </div>
      </div>
    </div>
  );
}
