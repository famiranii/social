"use client";
import { useEffect, useState } from "react";
import DropDown from "../DropDown";
import { api } from "../lib/api";
import { ResponseType } from "@/types/responseType";
import { dropdownType } from "@/types/dropdownType";

type Country = {
  id: number;
  name: string;
};

export default function HeaderDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Iran");
  const [options, setOptions] = useState<dropdownType[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res: ResponseType = await api.get("countries");
        console.log(res.data);
        setOptions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getCountries();
  }, []);
  return (
    <div className="relative w-48">
      <DropDown options={options} />
    </div>
  );
}
