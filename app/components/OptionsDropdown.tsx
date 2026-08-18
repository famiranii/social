import { useAppSelector } from "@/store/hooks/redux";
import { motion, AnimatePresence } from "framer-motion";

type OptionsDropdownProps = {
  open: boolean;
  options: string[];
  onChange: (option: string) => void;
};

export default function OptionsDropdown({
  open,
  options,
  onChange,
}: OptionsDropdownProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-70"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => onChange(option)}
              className="px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              {option}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
