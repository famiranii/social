"use client";
import Footer from "@/app/(auth)/components/Footer";
import Header from "@/app/(auth)/components/Header";
import SignupForm from "../components/SignupFrom";

export default function page() {
  return (
    <div className="w-80 md:w-130 lg:w-100 xl:w-130 bg-amber-50/15 h-165 rounded-3xl flex flex-col items-center p-4 py-8 md:p-8 md:py-12 border-white/40 border-2  backdrop-blur-md">
      <Header />
      <SignupForm />
      <Footer navigateTo={"login"} />
    </div>
  );
}
