type DateSeparatorProps = {
  date: string;
};

export default function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="sticky top-3 z-10 flex justify-center my-4">
      <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 shadow">
        {date}
      </span>
    </div>
  );
}
