import BackwardIcon from "@/public/icons/BackwardIcon";
import Image from "next/image";

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

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      {children}
      <aside className="w-90 h-full bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex w-full justify-between">
            <div className="relative ">
              <Image
                src={"/images/random-image.jpg"}
                alt={"profile"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />

              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
            <button className="text-xl font-bold text-gray-900 rounded-full rotate-180 hover:bg-gray-300">
              <BackwardIcon prop={{ width: 40, height: 40 }} />
            </button>
          </div>

          <input
            type="text"
            placeholder="Search"
            className="mt-4 w-full rounded-xl bg-gray-200 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
            >
              <div className="relative">
                <Image
                  src={chat.avatar}
                  alt={chat.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />

                <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>

                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>

                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
              </div>

              {chat.unread > 0 && (
                <div className="flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-sky-500 text-white text-xs font-medium">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
