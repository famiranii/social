"use client"
import { openModal } from "@/store/featurs/uiSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import { Menu } from "lucide-react";

export default function DrawerBtn() {
  const dispatch = useAppDispatch();
  const openDrawerHandler = () => {
    dispatch(openModal("drawer"));
  };
  return (
    <button
      onClick={openDrawerHandler}
      className="rounded-md bg-white p-2 shadow md:hidden"
    >
      <Menu size={24} color="black" />
    </button>
  );
}
