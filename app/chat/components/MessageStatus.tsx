import { Check } from "lucide-react";

type MessageStatusProps = {
  isMine: boolean;
  seenAt: string | null;
};

export default function MessageStatus({ isMine, seenAt }: MessageStatusProps) {
  if (!isMine) return null;

  return (
    <div className="relative ml-2 h-3 w-4">
      <Check
        size={12}
        strokeWidth={3}
        className="absolute left-0 top-0"
        color={seenAt ? "#3b82f6" : "white"}
      />

      <Check
        size={12}
        strokeWidth={3}
        className="absolute left-1 top-0"
        color={seenAt ? "#3b82f6" : "white"}
      />
    </div>
  );
}
