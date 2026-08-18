"use client";

import { Suspense, useEffect, useState } from "react";

import BackwardBtn from "./components/BackwardIBtn";
import SearchInput from "./components/SearchInput";
import ChatItem from "./components/ChatItem";
import ProfileImage from "./components/ProfileImage";

import useDebounce from "../components/lib/useDebaounse";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  getCoversationsApi,
  setChatPerson,
} from "@/store/featurs/chatSlice";
import { closeModal } from "@/store/featurs/uiSlice";
import WebSocket from "./components/WebSocket";
import CoverForDropdwons from "../components/CoverForDropdwons";

function ChatLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const chatId = params.chatId;

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const userId = useAppSelector(
    (state) => state.userInfo.userInfo.id
  );

  const chats = useAppSelector((state) => state.chats.chat);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const drawerOpen = useAppSelector((state) =>
    state.ui.modals.find(
      (item) => item.modalName === "drawer"
    )
  );

  useEffect(() => {
    if (userId !== 0) {
      dispatch(getCoversationsApi());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (!chats.length) return;

    if (chatId) {
      const chat = chats.find(
        (c) =>
          c.last_message.conversation_id === Number(chatId)
      );

      if (chat) {
        dispatch(setChatPerson(chat));
      }
    }

    if (id) {
      const chat = chats.find(
        (c) => c.conversation.id === Number(id)
      );

      if (chat) {
        dispatch(setChatPerson(chat));
        router.replace(
          "/chat/" + chat.last_message.conversation_id
        );
      }
    }
  }, [chats, chatId, id, dispatch, router]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.conversation.username
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      chat.last_message?.body
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase())
  );

  const handleChatItemClicked = (id: number) => {
    const chat = chats.find(
      (chat) =>
        chat.last_message.conversation_id === id
    );

    if (chat) {
      dispatch(setChatPerson(chat));
    }
  };

  return (
    <div className="flex h-screen">
      <WebSocket />

      {drawerOpen?.isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => dispatch(closeModal("drawer"))}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40
          h-screen w-90 bg-gray-300 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${
            drawerOpen?.isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          md:static
          md:translate-x-0
          md:flex
          md:flex-col
          md:w-90
        `}
      >
        <CoverForDropdwons />

        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <ProfileImage />

            <h1 className="text-2xl font-bold text-gray-900">
              Chats
            </h1>

            <div className="flex items-center gap-2">
              <button
                className="text-2xl md:hidden"
                onClick={() =>
                  dispatch(closeModal("drawer"))
                }
              >
                ✕
              </button>

              <div className="hidden md:block">
                <BackwardBtn />
              </div>
            </div>
          </div>

          <SearchInput
            value={search}
            setValue={setSearch}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats?.map((chat, index) => (
            <div
              key={index}
              onClick={() =>
                dispatch(closeModal("drawer"))
              }
            >
              <ChatItem
                chat={chat}
                handleChatItemClicked={
                  handleChatItemClicked
                }
              />
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatLayoutContent>
        {children}
      </ChatLayoutContent>
    </Suspense>
  );
}