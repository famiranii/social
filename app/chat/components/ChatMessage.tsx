import DateSeparator from "./DateSeparator";
import MessageStatus from "./MessageStatus";

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
  const currentDate = message.created_at.split(" ")[0];
  const previousDate = previousMessage?.created_at.split(" ")[0];

  const showDate = currentDate !== previousDate;

  return (
    <>
      {showDate && <DateSeparator date={currentDate} />}

      <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-md rounded-3xl px-5 py-3 shadow-sm ${
            isMine
              ? "bg-sky-500 text-white rounded-br-lg"
              : "bg-white text-gray-900 rounded-bl-lg"
          }`}
        >
          <p>{message.body}</p>

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
