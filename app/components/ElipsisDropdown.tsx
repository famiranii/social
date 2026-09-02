"use client";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import OptionsDropdown from "./OptionsDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { handleDropdownsOpen } from "@/store/featurs/uiSlice";

export default function EllipsisDropdown({
  options,
  handleClicked,
}: {
  options: string[];
  handleClicked: (option: string) => void;
}) {
  const dispatch = useAppDispatch();
  const isOpenCoverDropdown = useAppSelector(
    (state) => state.ui.ishandleDropdownsOpen,
  );
  const [open, setOpen] = useState(false);

  const optionClicked = (option: string) => {
    handleClicked(option);
    setOpen(false);
  };
  useEffect(() => {
    if (!isOpenCoverDropdown) {
      setOpen(false);
    }
  }, [isOpenCoverDropdown]);
  return (
    <div className="relative w-32 md:w-48">
      <div className="w-full flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
            dispatch(handleDropdownsOpen(true));
          }}
          className="text-black rounded-4xl p-2 hover:bg-gray-300"
        >
          <EllipsisVertical className="w-4 h-4 md:w-8 md:h-8" />
        </button>
      </div>
      <OptionsDropdown options={options} onChange={optionClicked} open={open} />
    </div>
  );
}
