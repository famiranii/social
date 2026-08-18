import OptionsDropdown from "@/app/components/OptionsDropdown";
import DateSeparator from "./DateSeparator";
import MessageStatus from "./MessageStatus";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { deleteChatApi, deleteMessageApi } from "@/store/featurs/chatSlice";
import { useEffect, useState } from "react";
import { handleDropdownsOpen } from "@/store/featurs/uiSlice";

type ChatMessageProps = {
  message: SingleCahtType;
  previousMessage?: SingleCahtType;
  isMine: boolean;
};

export default function ChatMessage({
  message,
  previousMessage,
  isMine,
}: ChatMessageProps) {
  const dispatch = useAppDispatch();

  const isOpenCoverDropdown = useAppSelector(
    (state) => state.ui.ishandleDropdownsOpen,
  );

  const currentDate = message.created_at.split(" ")[0];
  const previousDate = previousMessage?.created_at.split(" ")[0];

  const showDate = currentDate !== previousDate;
  const [openChatActions, setOpenChatActions] = useState(false);

  const handleRightClick = () => {
    setOpenChatActions(true);
    dispatch(handleDropdownsOpen(true));
  };

  const handleDropdownAction = async (name: string) => {
    switch (name) {
      case "Delete":
        await dispatch(
          deleteMessageApi({
            id: message.id,
            conv_id: message.conversation_id,
          }),
        );
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
    <>
      {showDate && <DateSeparator date={currentDate} />}
      <div
        className={`relative flex ${isMine ? "justify-end" : "justify-start"}`}
      >
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            handleRightClick();
          }}
          className={`max-w-md rounded-3xl px-5 py-3 shadow-sm ${
            isMine
              ? "bg-sky-500 text-white rounded-br-lg"
              : "bg-white text-gray-900 rounded-bl-lg"
          }`}
        >
          <p>{message.body}</p>
          {isMine && (
            <div className="absolute right-10 top-5 w-22">
              <OptionsDropdown
                options={["Delete"]}
                open={openChatActions}
                onChange={handleDropdownAction}
              />
            </div>
          )}
          <div
            className={`mt-2 flex items-center justify-end gap-1 text-xs ${
              isMine ? "text-sky-100" : "text-gray-400"
            }`}
          >
            <span>{message.created_at.split(" ")[1].slice(0, 5)}</span>

            <MessageStatus isMine={isMine} seenAt={message.seen_at} />
          </div>
        </div>
      </div>
    </>
  );
}
