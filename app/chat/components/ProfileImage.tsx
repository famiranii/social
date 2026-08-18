import { useAppSelector } from "@/store/hooks/redux";
import Image from "next/image";
import Link from "next/link";

export default function ProfileImage() {
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  return (
    <Link href={"/profile"}>
      {userInfo?.image ? (
        <div className="relative w-10 h-10">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + userInfo.image}
            alt="profile"
            fill
            className="rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        </div>
      ) : (
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
          {userInfo?.first_name?.[0] ?? "?"}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        </div>
      )}
    </Link>
  );
}
