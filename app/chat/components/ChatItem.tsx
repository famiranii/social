import Image from "next/image";
import { useRouter } from "next/navigation";
type ChatItemProps = {
  chat: ConversationItem;
  handleChatItemClicked: (id: number) => void;
};

export default function ChatItem({
  chat,
  handleChatItemClicked,
}: ChatItemProps) {
  const router = useRouter();
  const chatItemClicked = () => {
    handleChatItemClicked(chat.last_message.conversation_id);
    router.push("/chat/" + chat.last_message.conversation_id);
  };
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
      onClick={chatItemClicked}
    >
      <div className="relative">
        <Image
          src={chat.conversation.image || "/images/random-image.jpg"}
          alt={chat.conversation.username}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />

        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 truncate">
            {chat.conversation.username}
          </h3>

          <span className="text-xs text-gray-500">
            {chat.last_message.created_at}
          </span>
        </div>

        <p className="text-sm text-gray-500 truncate">
          {chat.last_message.body}
        </p>
      </div>

      {!chat.last_message.seen_at && (
        <div className="flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-sky-500 text-white text-xs font-medium">
          {chat.unreadCount}
        </div>
      )}
    </div>
  );
}
