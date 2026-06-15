"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";

type Country = {
  id: number;
  name: string;
};

export default function DropDown({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Iran");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("/countries");
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCountries();
  }, []);
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
