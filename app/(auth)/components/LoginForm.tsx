"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginBtn from "@/app/components/btns/LoginBtn";
import LoginInput from "@/app/components/iputs/LoginInput";
import PasswordIcon from "@/public/icons/PasswordIcon";
import UserIcon from "@/public/icons/UserIcon";
import { loginUser } from "@/app/components/lib/api";
import { loginSchema } from "@/app/components/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);
      console.log("LOGIN SUCCESS:", res);
      toast.success("Your login was successful");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("there is a problem with fetching data");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <div className="flex flex-col gap-6 mt-10 w-11/12">
        <LoginInput
          title="Email Or Username"
          Icon={UserIcon}
          {...register("email")}
          error={errors.email?.message}
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
