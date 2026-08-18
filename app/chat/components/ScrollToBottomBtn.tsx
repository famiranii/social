export default function ScrollToBottomBtn({
  onScrollDown,
  hasNewMessage,
}: {
  onScrollDown: () => void;
  hasNewMessage: boolean;
}) {
  return (
    <button
      onClick={onScrollDown}
      className="fixed bottom-24 right-2 z-50 bg-gray-600/50 backdrop-blur-2xl text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
    >
      ↓
      {hasNewMessage && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      )}
    </button>
  );
}
