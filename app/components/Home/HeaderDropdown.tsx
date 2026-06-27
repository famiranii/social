"use client";

import { useEffect, useState } from "react";
import DropDown from "../DropDown";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getCountriesApi } from "@/store/featurs/getCountriesSlice";
import { api } from "../lib/api";
import { getFilteredUsersApi } from "@/store/featurs/getUsersSlice";

export default function HeaderDropdown() {
  const options = useAppSelector((state) => state.countries.countries);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState("Iran");

  const changeCountry = async (country: string) => {
    setSelected(country);
    dispatch(getFilteredUsersApi(country));
  };

  useEffect(() => {
    if (options.length === 0) {
      dispatch(getCountriesApi());
    }
  }, []);

  return (
    <div className="relative w-48">
      <DropDown options={options} value={selected} onChange={changeCountry} />
    </div>
  );
}
