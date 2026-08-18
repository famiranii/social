"use client";

import { handleDropdownsOpen } from "@/store/featurs/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";

export default function CoverForDropdwons() {
  const dispatch = useAppDispatch();
  const handleCoverClick = () => {
    dispatch(handleDropdownsOpen(false));
  };
  const isShowCover = useAppSelector((state) => state.ui.ishandleDropdownsOpen);
  if (isShowCover)
    return (
      <div
        className="absolute z-30 w-full min-h-screen h-full"
        onClick={handleCoverClick}
        onContextMenu={(e) => {
          e.preventDefault();
          handleCoverClick();
        }}
      ></div>
    );
}
