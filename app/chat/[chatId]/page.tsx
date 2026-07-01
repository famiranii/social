"use client";
import EllipsisDropdown from "@/app/components/ElipsisDropdown";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import SendMessageInput from "../components/SendMessageInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useEffect, useRef, useState } from "react";
import { getCoversationApi } from "@/store/featurs/chatSlice";
import ChatMessage from "../components/ChatMessage";
import { api } from "@/app/components/lib/api";
import Loading from "@/app/components/Loading";

export default function page() {
  const router = useRouter();
  const params = useParams();
  const id = params.chatId;
  const chatPerson = useAppSelector((state) => state.chats.chatPerson);
  const chatInfo = useAppSelector(
    (state) => state.chats.chatInfo[Number(id)] ?? [],
  );
  const status = useAppSelector((state) => state.chats.status);
  const dispatch = useAppDispatch();
  const userProfileClickHandler = () => {
    router.push("/" + chatPerson?.conversation.id);
  };

  useEffect(() => {
    if (id) {
      const conv_id = +id;
      const getConversation = async () => {
        await dispatch(getCoversationApi({ conv_id, paginate: 0 }));
        await api.post("read/messages", { conv_id });
      };
      getConversation();
    }
  }, []);

  ///// for scroll bar
  const messagesRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const firstLoad = useRef(true);
  useEffect(() => {
    if (!messagesRef.current || !chatInfo?.length) return;

    if (firstLoad.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      firstLoad.current = false;
    }
  }, [chatInfo]);

  const handleScroll = async () => {
    const container = messagesRef.current;

    if (!container || loadingMore) return;

    if (container.scrollTop <= 20) {
      setLoadingMore(true);

      const previousHeight = container.scrollHeight;

      const nextPage = page + 1;
      if (status === "endOfMessages") {
        return;
      }
      await dispatch(
        getCoversationApi({
          conv_id: Number(id),
          paginate: nextPage,
        }),
      );

      setPage(nextPage);

      requestAnimationFrame(() => {
        if (!messagesRef.current) return;

        const newHeight = messagesRef.current.scrollHeight;
        messagesRef.current.scrollTop += newHeight - previousHeight;
      });

      setLoadingMore(false);
    }
  };
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
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-scroll px-6 py-5"
      >
        <div className="min-h-full flex flex-col justify-end gap-4">
          {loadingMore && (
            <div className="flex justify-center py-2">
              <Loading width={30} />
            </div>
          )}
          {chatInfo.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              previousMessage={chatInfo[index - 1]}
              isMine={message.sender_id !== chatPerson?.conversation.id}
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <SendMessageInput />
    </div>
  );
}
