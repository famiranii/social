"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownType } from "@/types/dropdownType";

type Country = {
  id: number;
  name: string;
};

export default function DropDown({ options }: { options: dropdownType[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Iran");

  return (
    <div className="relative w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-all"
      >
        <span className="text-slate-700 font-medium">{selected}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <div className="absolute mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50">
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="dropdown-scroll max-h-64 overflow-y-auto py-2"
            >
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => {
                    setSelected(option.name);
                    setOpen(false);
                  }}
                  className="px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  {option.name}
                </li>
              ))}
            </motion.ul>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
