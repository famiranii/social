"use client";

import { useEffect, useState } from "react";
import DropDown from "../DropDown";
import { api } from "../lib/api";
import { ResponseType } from "@/types/responseType";
import { dropdownType } from "@/types/dropdownType";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getCountriesApi } from "@/store/featurs/getCountriesSlice";

export default function HeaderDropdown() {
  const options = useAppSelector((state) => state.countries.countries);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState("Iran");

  useEffect(() => {
    if (options.length === 0) {
      dispatch(getCountriesApi());
    }
  }, []);

  return (
    <div className="relative w-48">
      <DropDown
        options={options}
        value={selected}
        onChange={(value) => setSelected(value)}
      />
    </div>
  );
}
