export default function Page() {
  return (
    <div className="flex-1 h-full flex flex-col">
      {/* Header */}
      <div className="h-18 px-6 bg-gray-300 flex items-center justify-between" />

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No conversation selected
          </h2>

          <p className="text-sm  mt-2">
            Please choose one of your friends to start the conversation
          </p>
        </div>
      </div>
    </div>
  );
}
