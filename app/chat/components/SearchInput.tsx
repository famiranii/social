"use client";

import { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function SearchInput({ value, setValue }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="mt-4 w-full rounded-xl bg-gray-200 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
    />
  );
}
