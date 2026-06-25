"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DateInput({ value, onChange }: Props) {
  console.log(value);
  
  const [selected, setSelected] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;

    const formatted = format(selected, "yyyy-MM-dd");
    setInputValue(formatted);
    onChange(formatted);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="w-2/5 relative">
      {/* Calendar popup */}
      {open && (
        <div className="rounded-2xl bg-gray-700 p-3 shadow-md absolute -left-50 top-12 z-100">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCancel}
              className="w-1/2 rounded-xl bg-gray-500 py-2 text-white font-medium hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="w-1/2 rounded-xl bg-sky-500 py-2 text-white font-medium disabled:opacity-40"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <input
        id="date"
        value={inputValue || value || ""}
        placeholder="Select date"
        onClick={() => setOpen(!open)}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border-b border-gray-300 focus:border-sky-500 outline-none bg-transparent"
      />

      {/* Telegram-like styling */}
      <style jsx global>{`
        .telegram-calendar .rdp-day_selected {
          background: #2aabee !important;
          color: white !important;
          border-radius: 9999px !important;
        }

        .telegram-calendar .rdp-day:hover {
          background: #f1f5f9;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
