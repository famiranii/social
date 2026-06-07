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
        <div>
          <Image
            src="/images/Group 8.png"
            alt="logins"
            width={0}
            height={0}
            sizes="80vw"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
          {children}
      </div>{" "}
    </div>
  );
}
