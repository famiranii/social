'use client'
import BackwardIcon from "@/public/icons/BackwardIcon";
import { useRouter } from "next/navigation";

export default function BackwardBtn() {
  const router = useRouter()
  const backwardIconClicked=()=>{
    router.push("/")
  }
  return (
    <button className="text-xl font-bold text-gray-900 rounded-full rotate-180 hover:bg-gray-300" onClick={backwardIconClicked}>
      <BackwardIcon prop={{ width: 40, height: 40 }} />
    </button>
  );
}
