import OptionsDropdown from "@/app/components/OptionsDropdown";
import { deleteChatApi } from "@/store/featurs/chatSlice";
import { handleDropdownsOpen } from "@/store/featurs/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ChatItemProps = {
  chat: ConversationItem;
  handleChatItemClicked: (id: number) => void;
};

export default function ChatItem({
  chat,
  handleChatItemClicked,
}: ChatItemProps) {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isOpenCoverDropdown = useAppSelector(
    (state) => state.ui.ishandleDropdownsOpen,
  );

  const id = Number(params.chatId ?? 0);
  const chatItemClicked = () => {
    handleChatItemClicked(chat.last_message.conversation_id);
    router.push("/chat/" + chat.last_message.conversation_id);
  };

  const [openChatActions, setOpenChatActions] = useState(false);

  const handleRightClick = () => {
    setOpenChatActions(true);
    dispatch(handleDropdownsOpen(true));
  };
  const handleDropdownAction = (name: string) => {
    switch (name) {
      case "Delete":
        dispatch(deleteChatApi(chat.last_message.conversation_id));
        dispatch(handleDropdownsOpen(false));

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!isOpenCoverDropdown) {
      setOpenChatActions(false);
    }
  }, [isOpenCoverDropdown]);
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
        id === chat.last_message.conversation_id ? "bg-gray-200" : ""
      } cursor-pointer transition`}
      onClick={chatItemClicked}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRightClick();
      }}
    >
      <div className="absolute w-44 right-0">
        <OptionsDropdown
          options={["Delete"]}
          onChange={handleDropdownAction}
          open={openChatActions}
        />
      </div>
      <div className="relative w-12 h-12">
        {chat?.conversation.image ? (
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + chat.conversation.image}
            fill
            alt="profile"
            className="rounded-full object-cover"
          />
        ) : (
          <div className="rounded-full flex items-center justify-center h-full w-full bg-blue-900">
            {chat.conversation.username
              ? chat?.conversation?.username[0]
              : "Chat"}
          </div>
        )}
        {/* <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span> */}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 truncate">
            {chat.conversation.username}
          </h3>

          <span className="text-xs text-gray-500">
            <span className="text-xs text-gray-500">
              {chat.last_message.created_at.slice(0, 16)}
            </span>
          </span>
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-gray-500 truncate">
            {chat.last_message.body}
          </p>
          {chat.unreadCount !== 0 && (
            <div className="flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-sky-500 text-white text-xs font-medium">
              {chat.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
