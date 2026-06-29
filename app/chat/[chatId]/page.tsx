"use client";
import EllipsisDropdown from "@/app/components/ElipsisDropdown";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import SendMessageInput from "../components/SendMessageInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useEffect } from "react";
import { getCoversationApi } from "@/store/featurs/chatSlice";

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

export default function page() {
  const router = useRouter();
  const params = useParams();
  const id = params.chatId;
  const chatPerson = useAppSelector((state) => state.chats.chatPerson);
  const chatInfo = useAppSelector((state) => state.chats.chatInfo);
  const dispatch = useAppDispatch();
  const userProfileClickHandler = () => {
    router.push("/fakeid");
  };

  useEffect(() => {
    if (id) {
      const conv_id = +id;
      const getConversation = async () =>
        await dispatch(getCoversationApi({ conv_id, paginate: 0 }));
      getConversation();
    }
  }, []);
  return (
    <div className="flex-1 h-full flex flex-col">
      {/* Header */}
      <div className="h-18 px-6 border-b bg-gray-300 flex items-center justify-between">
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
            <h2 className="font-semibold text-gray-900">
              {chatPerson?.conversation.username}
            </h2>

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
        {chatInfo?.map((message) => (
          <div
            key={message.created_at}
            className={`flex ${
              message.sender_id !== chatPerson?.conversation.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-md rounded-3xl px-5 py-3 shadow-sm ${
                message.sender_id !== chatPerson?.conversation.id
                  ? "bg-sky-500 text-white rounded-br-lg"
                  : "bg-white text-gray-900 rounded-bl-lg"
              }`}
            >
              <p>{message.body}</p>

              <div
                className={`text-xs mt-2 ${
                  message.sender_id !== chatPerson?.conversation.id
                    ? "text-sky-100"
                    : "text-gray-400"
                }`}
              >
                {message.created_at}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <SendMessageInput />
    </div>
  );
}
