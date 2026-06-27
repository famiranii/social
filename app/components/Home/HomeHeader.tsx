import Image from "next/image";
import DropDown from "./HeaderDropdown";
import Navbar from "./Navbar";

export default function HomeHeader() {
  return (
    <div className="w-full bg-amber-50/40 backdrop-blur-xl h-18 flex justify-between px-12 py-6 items-center  fixed z-10">
      <div className="h-full flex items-center justify-center">
        <Image
          src="/images/Logo.jpeg"
          alt="card"
          width={100}
          height={100}
          className="bg-none"
        />
      </div>
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <Navbar />
      </div>
      <DropDown />
    </div>
  );
}
