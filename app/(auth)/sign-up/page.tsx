"use client";
import Footer from "@/app/(auth)/components/Footer";
import Header from "@/app/(auth)/components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/app/components/schemas";
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
    <div className="w-80 md:w-130 bg-amber-50/15 h-143 rounded-3xl flex flex-col items-center p-4 py-8 md:p-8 md:py-12 border-white/40 border-2  backdrop-blur-md">
      <Header />
      <SignupForm />
      <Footer navigateTo={"login"} />
    </div>
  );
}
