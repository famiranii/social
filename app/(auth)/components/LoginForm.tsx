"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginBtn from "@/app/components/btns/LoginBtn";
import LoginInput from "@/app/components/iputs/LoginInput";
import PasswordIcon from "@/public/icons/PasswordIcon";
import UserIcon from "@/public/icons/UserIcon";
import { loginSchema } from "@/app/components/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { loginApi } from "@/store/featurs/authSlice";
import { useEffect } from "react";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    await dispatch(loginApi(data));
  };

  useEffect(() => {
    if (authInfo.status === "success") {
      toast.success("Login successful");
      router.push("/");
    }

    if (authInfo.status === "failed") {
      toast.error(authInfo.error || "Login failed");
    }
    if (authInfo.status === "notMatch") {
      toast.error(authInfo.error || "Username Or Password Is Wrong");
      console.log("f");
      
    }
  }, [authInfo.status, authInfo.error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <div className="flex flex-col gap-6 mt-10 w-11/12">
        <LoginInput
          title="Email Or Username"
          Icon={UserIcon}
          {...register("username")}
          error={errors.username?.message}
        />

        <LoginInput
          title="Password"
          Icon={PasswordIcon}
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <div className="mt-6 w-full flex justify-center">
        <LoginBtn loading={isSubmitting}>Login</LoginBtn>
      </div>
    </form>
  );
}
