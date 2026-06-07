"use client";
import { useRouter } from "next/navigation";
import GoogleBtn from "../../components/btns/GoogleBtn";

export default function Footer({ navigateTo }: { navigateTo: string }) {
  const router = useRouter();
  const navigateBtnClicked = () => {
    router.push(navigateTo);
  };
  return (
    <>
      <div className="flex mt-4 gap-4 items-center">
        <p>Or Continue with </p>
        <GoogleBtn />
      </div>
      <div className="text-sm mt-3">
        <span>Don't have an account ?</span>{" "}
        <button
          className="text-red-700 cursor-pointer"
          onClick={navigateBtnClicked}
        >
          {navigateTo === "login" ? "Login" : "Sign up"}
        </button>
      </div>
    </>
  );
}
