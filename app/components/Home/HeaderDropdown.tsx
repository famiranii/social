"use client";

import { useEffect, useState } from "react";
import DropDown from "../DropDown";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getCountriesApi } from "@/store/featurs/getCountriesSlice";
import {
  getFilteredUsersApi,
  getUsersApi,
  setSelectedCountry,
} from "@/store/featurs/getUsersSlice";
import { useRouter } from "next/navigation";

export default function HeaderDropdown() {
  const options = useAppSelector((state) => state.countries.countries);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState("All");

  const changeCountry = async (country: string) => {
    dispatch(setSelectedCountry(country));
    setSelected(country);
    router.push("/");
    if (country === "All") {
      await dispatch(getUsersApi({ page: 0 }));
      return;
    }
    await dispatch(getFilteredUsersApi({ country, is_saved: false, page: 0 }));
  };

  useEffect(() => {
    if (options.length === 0) {
      // dispatch(getUsersApi({page}));
      dispatch(getCountriesApi());
    }
  }, []);

  return (
    <div className="relative w-48">
      <DropDown options={options} value={selected} onChange={changeCountry} />
    </div>
  );
}
