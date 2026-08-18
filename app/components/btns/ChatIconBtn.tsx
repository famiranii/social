"use client";
import ChatIcon from "@/public/icons/ChatIcon";
import { setChatPerson } from "@/store/featurs/chatSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function ChatIconBtn({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const chatIconClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      setChatPerson({
        conversation: {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image,
        },
        last_message: {
          conversation_id: 0,
          sender_id: 0,
          body: "",
          created_at: "",
          seen_at: null,
        },
        unreadCount: 0,
      }),
    );

    router.push(`/chat/new?id=${encodeURIComponent(user.id)}`);
  };
  return (
    <button onClick={chatIconClickHandler}>
      <ChatIcon />
    </button>
  );
}
