"use client";
import LoginBtn from "@/app/components/btns/LoginBtn";
import LoginInput from "@/app/components/iputs/LoginInput";
import EmailIcon from "@/public/icons/EmailIcon";
import PasswordIcon from "@/public/icons/PasswordIcon";
import UserIcon from "@/public/icons/UserIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/app/components/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { signupApi } from "@/store/featurs/authSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  username: string;
  password: string;
  re_password: string;
};

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: FormData) => {
    await dispatch(signupApi(data));
  };
  useEffect(() => {
    if (authInfo.status === "successSignUP") {
      toast.success("Sign up was successful");
      router.push("/login");
    }

    if (authInfo.status === "failed") {
      toast.error(authInfo.error ?? "Sign up failed");
    }

    if (authInfo.status === "invalid username") {
      toast.error(authInfo.error ?? "Username already exists");
    }

    if (authInfo.status === "invalid email") {
      toast.error(authInfo.error ?? "Email is already registered");
    }
    if (authInfo.status === "re password not match") {
      toast.error(authInfo.error ?? "re password not match");
    }
  }, [authInfo.status, authInfo.error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <div className="flex flex-col gap-6 mt-10 w-11/12">
        <LoginInput
          title="Email"
          Icon={EmailIcon}
          {...register("email")}
          error={errors.email?.message}
        />
        <LoginInput
          title="Username"
          Icon={UserIcon}
          {...register("username")}
          error={errors.username?.message}
        />
        <LoginInput
          title="Password"
          Icon={PasswordIcon}
          {...register("password")}
          error={errors.password?.message}
        />
        <LoginInput
          title="Password Again"
          Icon={PasswordIcon}
          {...register("re_password")}
          error={errors.re_password?.message}
        />
      </div>
      <div className="mt-6 w-full flex justify-center">
        <LoginBtn loading={isSubmitting}>Sign UP</LoginBtn>
      </div>
    </form>
  );
}
