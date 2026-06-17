"use client";
import ChatIcon from "@/public/icons/ChatIcon";
import { useRouter } from "next/navigation";

export default function ChatIconBtn() {
  const router = useRouter();
  const chatIconClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/chat/" + "fakeid");
  };
  return (
    <button onClick={chatIconClickHandler}>
      <ChatIcon />
    </button>
  );
}
