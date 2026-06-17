"use client";
import EllipsisDropdown from "@/app/components/ElipsisDropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";

const messages = [
  {
    id: 1,
    sender: "other",
    text: "Hey! How are you doing today?",
    time: "10:20",
  },
  {
    id: 2,
    sender: "me",
    text: "I'm great! What about you?",
    time: "10:21",
  },
  {
    id: 3,
    sender: "other",
    text: "Doing well 😊",
    time: "10:22",
  },
];

export default function ChatPage() {
  const router = useRouter();
  const userProfileClickHandler = () => {
    router.push("/fakeid");
  };
  return (
    <div className="flex-1 h-full flex flex-col">
      {/* Header */}
      <div className="h-18 px-6 border-b bg-gray-50 flex items-center justify-between">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={userProfileClickHandler}
        >
          <Image
            src="/images/random-image.jpg"
            alt="Sarah"
            width={48}
            height={48}
            className="rounded-full"
          />

          <div>
            <h2 className="font-semibold text-gray-900">Sarah Johnson</h2>

            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <div>
          <EllipsisDropdown
            options={["Clear Chat", "Report", "Letf The Group"]}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md rounded-3xl px-5 py-3 shadow-sm ${
                message.sender === "me"
                  ? "bg-sky-500 text-white rounded-br-lg"
                  : "bg-white text-gray-900 rounded-bl-lg"
              }`}
            >
              <p>{message.text}</p>

              <div
                className={`text-xs mt-2 ${
                  message.sender === "me" ? "text-sky-100" : "text-gray-400"
                }`}
              >
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 rounded-full text-black bg-gray-200 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button className="rounded-full bg-sky-500 px-6 py-3 text-white font-medium hover:bg-sky-600 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
