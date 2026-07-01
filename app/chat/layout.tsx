"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import BackwardBtn from "./components/BackwardIBtn";
import SearchInput from "./components/SearchInput";
import ChatItem from "./components/ChatItem";
import ProfileImage from "./components/ProfileImage";

import useDebounce from "../components/lib/useDebaounse";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { api } from "../components/lib/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {  setChatPerson } from "@/store/featurs/chatSlice";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const chatId = params.chatId;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userInfo.userInfo.id);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chats, setChats] = useState<ConversationItem[]>([]);
  useEffect(() => {
    if (userId !== 0) {
      const getChats = async () => {
        const res: { data: ConversationItem[] } =
          await api.get("conversations");

        setChats(res.data);
        if (chatId) {
          const id = +chatId;
          const chat = res.data.find(
            (chat) => chat.last_message.conversation_id === id,
          );
          if (chat) {
            dispatch(setChatPerson(chat));
          }
        }
        if (id) {
          const chat = res.data.find((chat) => chat.conversation.id === +id);
          if (chat) {
            dispatch(setChatPerson(chat));
            router.replace("/chat/" + chat.last_message.conversation_id);
          } else {
            // dispatch(clearChatInfo());
          }
        }
      };

      getChats();
    }
  }, [userId]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.conversation.username
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      chat.last_message.body
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
  );

  const handleChatItemClicked = (id: number) => {
    const chat = chats.find((chat) => chat.last_message.conversation_id === id);
    if (chat) {
      dispatch(setChatPerson(chat));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-4 left-4 z-40 rounded-md bg-white p-2 shadow md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-90 bg-gray-300 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:translate-x-0
          md:flex
          md:flex-col
          md:w-90
        `}
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <ProfileImage />
            <h1 className="text-2xl font-bold text-gray-900">Chats</h1>

            <div className="flex items-center gap-2">
              {/* Close button on mobile */}
              <button
                className="text-2xl md:hidden"
                onClick={() => setDrawerOpen(false)}
              >
                ✕
              </button>

              <div className="hidden md:block">
                <BackwardBtn />
              </div>
            </div>
          </div>

          <SearchInput value={search} setValue={setSearch} />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.conversation.id}
              onClick={() => setDrawerOpen(false)}
            >
              <ChatItem
                chat={chat}
                handleChatItemClicked={handleChatItemClicked}
              />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
