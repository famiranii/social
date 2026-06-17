"use client";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EllipsisDropdown({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Iran");

  return (
    <div className="relative w-48">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="text-black rounded-4xl p-2 hover:bg-gray-300"
        >
          <EllipsisVertical className="w-8 h-8" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
                className="px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
