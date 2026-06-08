import DoubleHeart from "@/public/icons/DoubleHeart";
import PurpleHeart from "@/public/icons/PurpleHeart";

export default function Header() {
  return (
    <>
      <div className="flex">
        <div className="mr-2">
          <DoubleHeart />
        </div>
        <div>
          <p className="font-semibold text-xl md:text-3xl text-white mt-2">
            Find Your Match
          </p>
        </div>
      </div>
      <div className="mt-2 flex">
        <p className="text-sm">Discover , Connect , Try something real</p>
        <div className="ml-2">
          <PurpleHeart />
        </div>
      </div>
    </>
  );
}
