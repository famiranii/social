"use client";

import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile, Send } from "lucide-react";
import { api } from "@/app/components/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addNewChatToChats,
  addnewMessageToMessage,
} from "@/store/featurs/chatSlice";

export default function SendMessageInput() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = searchParams.get("id");

  const chatPerson = useAppSelector((state) => state.chats.chatPerson);

  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSend = async () => {
    const body = message.trim();

    if (!body) return;

    try {
      const res: {
        data: ConversationItem;
        last_message?: SingleCahtType;
      } = await api.post("send/message", {
        receiver: id ?? chatPerson?.conversation.id,
        body,
      });

      console.log("SEND MESSAGE RESPONSE:", res);

      if (id) {
        dispatch(addNewChatToChats(res.data));

        if (res.last_message?.conversation_id) {
          router.push("/chat/" + res.last_message.conversation_id);
        }
      } else if (res.last_message) {
        dispatch(addnewMessageToMessage(res.last_message));
      }

      setMessage("");
    } catch (error) {
      console.error("send message error:", error);
    }
  };

  return (
    <div className="relative border-t bg-white p-4">
      {showPicker && (
        <div ref={pickerRef} className="absolute bottom-20 left-4 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={320}
            height={400}
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          className="rounded-full bg-gray-200 p-3 transition hover:bg-gray-300"
        >
          <Smile size={22} />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Write a message..."
          className="flex-1 rounded-full bg-gray-200 px-5 py-3 text-black outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="button"
          onClick={handleSend}
          className="rounded-full bg-sky-500 p-3 text-white transition hover:bg-sky-600"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
