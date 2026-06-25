import { useAppSelector } from "@/store/hooks/redux";
import Image from "next/image";
import Link from "next/link";

export default function ProfileImage() {
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  console.log(userInfo);
  return (
    <Link href={"/profile"}>
      <div className="relative ">
        <Image
          src={"/images/random-image.jpg"}
          alt={"profile"}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
      </div>
    </Link>
  );
}
