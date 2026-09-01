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
    <div className="relative w-52 text-slate-800">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
      group flex h-11 w-full items-center justify-between
      rounded-full
      border border-slate-200
      bg-white
      px-4
      text-sm font-medium
      shadow-sm
      transition-all duration-200
      hover:border-indigo-300
      hover:shadow-md
      focus:outline-none
      focus:ring-4 focus:ring-indigo-500/10
    "
      >
        <span className="truncate text-slate-700">
          {value || "Select an option"}
        </span>

        <ChevronDown
          className={`
        h-4 w-4 shrink-0 text-slate-400
        transition-transform duration-200
        ${open ? "rotate-180 text-indigo-500" : ""}
      `}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="
          absolute left-0 right-0 z-50 mt-2
          overflow-hidden
          rounded-2xl
          border border-slate-100
          bg-white
          p-1.5
          shadow-[0_12px_35px_rgba(15,23,42,0.12)]
        "
          >
            <div className="max-h-52 overflow-y-auto overscroll-contain">
              {options.map((option) => {
                const isSelected = option.name === value;

                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => {
                      onChange(option.name);
                      setOpen(false);
                    }}
                    className={`
                  flex w-full items-center justify-between
                  rounded-xl
                  px-3.5 py-2.5
                  text-left text-sm
                  transition-colors duration-150
                  ${
                    isSelected
                      ? "bg-indigo-50 font-medium text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
                  >
                    <span>{option.name}</span>

                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
