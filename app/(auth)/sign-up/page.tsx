"use client";
import LoginBtn from "@/app/components/btns/LoginBtn";
import LoginInput from "@/app/components/iputs/LoginInput";
import Footer from "@/app/(auth)/components/Footer";
import Header from "@/app/(auth)/components/Header";
import EmailIcon from "@/public/icons/EmailIcon";
import PasswordIcon from "@/public/icons/PasswordIcon";
import UserIcon from "@/public/icons/UserIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/app/components/schemas";
import { loginUser } from "@/app/components/lib/api";
import SignupForm from "../components/SignupFrom";

type FormData = {
  email: string;
  username: string;
  password: string;
};

export default function page() {
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
    <div className="w-130 bg-amber-50/15 h-143 rounded-3xl flex flex-col items-center p-8 py-12 border-white/40 border-2">
      <Header />
      <SignupForm />
      <Footer navigateTo={"login"} />
    </div>
  );
}
