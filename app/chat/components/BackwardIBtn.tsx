'use client'
import BackwardIcon from "@/public/icons/BackwardIcon";
import { useRouter } from "next/navigation";

export default function BackwardBtn() {
  const router = useRouter()
  const backwardIconClicked=()=>{
    router.back()
  }
  return (
    <button className="text-xl p-0.5 font-bold text-gray-900 rounded-full rotate-180 hover:bg-gray-400/10" onClick={backwardIconClicked}>
      <BackwardIcon prop={{ width: 40, height: 40 }} />
    </button>
  );
}
