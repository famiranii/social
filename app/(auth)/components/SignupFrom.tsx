"use client";
import LoginBtn from "@/app/components/btns/LoginBtn";
import LoginInput from "@/app/components/iputs/LoginInput";
import EmailIcon from "@/public/icons/EmailIcon";
import PasswordIcon from "@/public/icons/PasswordIcon";
import UserIcon from "@/public/icons/UserIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/app/components/schemas";
import { loginUser } from "@/app/components/lib/api";

type FormData = {
  email: string;
  username: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);
      console.log("LOGIN SUCCESS:", res);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

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
      </div>
      <div className="mt-6 w-full flex justify-center">
        <LoginBtn loading={isSubmitting}>Sign UP</LoginBtn>
      </div>
    </form>
  );
}
