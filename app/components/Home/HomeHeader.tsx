import Image from "next/image";
import DropDown from "./HeaderDropdown";
import Navbar from "./Navbar";

export default function HomeHeader() {
  return (
    <>
      <div className="w-full bg-amber-50/40 backdrop-blur-xl h-18 flex justify-between px-12 py-6 items-center fixed z-40">
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

      {/* Mobile footer navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-amber-100/40 backdrop-blur-xl flex justify-center py-3 z-40 md:hidden">
        <Navbar />
      </div>
    </>
  );
}
