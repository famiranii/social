import React from "react";
import DropDown from "./DropDown";

export default function HomeHeader() {
  const options = ["usa", "brazil", "iran", "torkey", "spain", "england"];
  return (
    <div className="w-full bg-amber-50/15 h-18 flex justify-between px-12 py-6 items-center  fixed">
      <div></div>
      <DropDown options={["Iran" , "USA" , "Spain" , "England"]}/>
    </div>
  );
}
