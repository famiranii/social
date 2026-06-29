"use client";

import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile, Send } from "lucide-react";
import { api } from "@/app/components/lib/api";
import { useAppSelector } from "@/store/hooks/redux";

export default function SendMessageInput() {
  const chatPerson = useAppSelector((state) => state.chats.chatPerson);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const handleSend = async () => {
    const body = message.trim();
    if (!body) return;
    const res = await api.post("send/message", {
      receiver: chatPerson?.conversation.id,
      body,
    });

    setMessage("");
  };

  return (
    <div className="relative bg-white border-t p-4">
      {/* Emoji Picker */}
      {showPicker && (
        <div className="absolute bottom-20 left-4 z-50">
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
