import DropDown from "./HeaderDropdown";
import Navbar from "./Navbar";

export default function HomeHeader() {
  const options = ["usa", "brazil", "iran", "torkey", "spain", "england"];
  return (
    <div className="w-full bg-amber-50/40 backdrop-blur-xl h-18 flex justify-between px-12 py-6 items-center  fixed z-10">
      <div></div>
      <Navbar />
      <DropDown />
    </div>
  );
}
