"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownType } from "@/types/dropdownType";

type Props = {
  options: dropdownType[];
  value: string;
  onChange: (value: string) => void;
};

export default function DropDown({ options, value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-48 text-black">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-md border border-slate-200 "
      >
        <span>{value}</span>
        <ChevronDown className={`w-5 h-5 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full bg-white shadow-xl rounded-xl z-50 overflow-hidden"
          >
            <div className="h-48 overflow-y-auto">
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => {
                    onChange(option.name); // 👈 مهم
                    setOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option.name}
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
