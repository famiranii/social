import GoogleIcon from "@/public/icons/GoogleIcon";
import React from "react";

export default function GoogleBtn() {
  return (
    <div>
      <button className="w-32 h-10 rounded-2xl bg-amber-50 text-black flex justify-center gap-2 items-center cursor-pointer">
        <div>
          <GoogleIcon prop={{ height: 25, width: 25 }} />
        </div>
        <p className="font-bold">Google</p>
      </button>
    </div>
  );
}
