"use client";
import BackwardBtn from "./components/BackwardIBtn";
import SearchInput from "./components/SearchInput";
import { useState } from "react";
import useDebounce from "../components/lib/useDebaounse";
import { useRouter } from "next/navigation";
import ChatItem from "./components/ChatItem";
import ProfileImage from "./components/ProfileImage";

const chats = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "See you tonight ❤️",
    time: "12:45",
    unread: 2,
    avatar: "/images/random-image.jpg",
  },
  {
    id: 2,
    name: "Michael",
    message: "Sent a photo",
    time: "11:30",
    unread: 0,
    avatar: "/images/random-image.jpg",
  },
  {
    id: 3,
    name: "Emma Wilson",
    message: "Typing...",
    time: "09:12",
    unread: 1,
    avatar: "/images/random-image.jpg",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      chat.message.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="h-screen flex">
      {children}
      <aside className="w-90 h-full bg-gray-300 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex w-full justify-between">
            <ProfileImage />
            <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
            <BackwardBtn />
          </div>

          <SearchInput value={search} setValue={setSearch} />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <ChatItem chat={chat} key={chat.id} />
          ))}
        </div>
      </aside>
    </div>
  );
}
