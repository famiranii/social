"use client";
import EllipsisDropdown from "@/app/components/ElipsisDropdown";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import SendMessageInput from "../components/SendMessageInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useEffect, useRef, useState } from "react";
import {
  clearUnreadCount,
  deleteChatApi,
  getCoversationApi,
} from "@/store/featurs/chatSlice";
import ChatMessage from "../components/ChatMessage";
import { api } from "@/app/components/lib/api";
import Loading from "@/app/components/Loading";
import DrawerBtn from "../components/DrawerBtn";
import ScrollToBottomBtn from "../components/ScrollToBottomBtn";
import ReportModal from "../components/ReportModal";

export default function Page() {
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
    router.push("/" + chatPerson?.conversation?.id);
  };

  useEffect(() => {
    if (id && id != "new") {
      const conv_id = +id;
      const getConversation = async () => {
        await api.post("read/messages", { conv_id });
        dispatch(clearUnreadCount(conv_id));
        if (chatInfo.length > 0) {
          return;
        }
        await dispatch(getCoversationApi({ conv_id, paginate: 0 }));
      };
      getConversation();
    }
  }, [id]);

  ///// for scroll bar
  const messagesRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
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

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (isNearBottom) setHasNewMessage(false);

    if (container.scrollTop <= 20) {
      setLoadingMore(true);

      const previousHeight = container.scrollHeight;

      const nextPage = page + 1;
      if (status === "endOfMessages") {
        setLoadingMore(false);
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
      setHasNewMessage(false);
      setLoadingMore(false);
    }
  };
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container || isLoadingMoreRef.current) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setHasNewMessage(true);
    }
  }, [chatInfo.length]);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setHasNewMessage(true);
    }
  }, [chatInfo.length]);

  ///////////////////

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  //// chat actions

  const handleDropdwonOptionsClicked = async (action: string) => {
    switch (action) {
      case "Delete Chat":
        await dispatch(deleteChatApi(Number(id)));
        router.push("/chat");
        break;
      case "Report":
        setIsOpenReportModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex-1 h-full flex flex-col">
      {/* Header */}
      <div className="h-18 px-6 border-b bg-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DrawerBtn />
          <div
            className="relative w-14 h-14 shrink-0 cursor-pointer"
            onClick={userProfileClickHandler}
          >
            {chatPerson?.conversation?.image ? (
              <Image
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL +
                  chatPerson.conversation?.image
                }
                fill
                alt="profile"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="rounded-full flex items-center justify-center h-full w-full bg-blue-900">
                {chatPerson?.conversation?.username[0]}
              </div>
            )}
            {/* <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span> */}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {chatPerson?.conversation?.username}
            </h2>
            {/* <p className="text-sm text-green-500">Online</p> */}
          </div>
        </div>
        <div>
          <EllipsisDropdown
            options={["Delete Chat", "Report"]}
            handleClicked={handleDropdwonOptionsClicked}
          />
        </div>
      </div>
      {/* Messages */}
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-scroll px-6 py-5"
      >
        {loadingMore && (
          <div className="h-15">
            <Loading width={50} />
          </div>
        )}
        <div className="min-h-full flex flex-col justify-end gap-4">
          {chatInfo.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              previousMessage={chatInfo[index - 1]}
              isMine={message.sender_id !== chatPerson?.conversation?.id}
            />
          ))}

          <div ref={bottomRef} />
        </div>
      </div>
      {/* Input */}
      <ScrollToBottomBtn
        onScrollDown={scrollToBottom}
        hasNewMessage={hasNewMessage}
      />
      <SendMessageInput />
      {isOpenReportModal && (
        <ReportModal
          reported_id={chatPerson?.conversation.id || 0}
          reported_username={chatPerson?.conversation.username || ""}
          closeModal={() => setIsOpenReportModal(false)}
        />
      )}
    </div>
  );
}
