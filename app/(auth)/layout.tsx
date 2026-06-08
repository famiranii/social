import DoubleHeart from "@/public/icons/DoubleHeart";
import PurpleHeart from "@/public/icons/PurpleHeart";
import React from "react";
import GoogleBtn from "../components/btns/GoogleBtn";
import Image from "next/image";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { type: string };
}) {
  const isLogin = params.type === "login";
  const isSignup = params.type === "signup";
  console.log(isLogin);
  
  return (
    <div>
      <div className="flex items-center h-screen justify-evenly">
        <div className="absolute md:relative -z-10">
          <Image
            src="/images/Group 8.png"
            alt="logins"
            width={600}
            height={600}
          />
        </div>
          {children}
      </div>{" "}
    </div>
  );
}
