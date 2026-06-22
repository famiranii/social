"use client";

import { useState } from "react";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import BirthDaate from "./components/BirthDaate";
import DropDown from "../components/DropDown";
import FormInput from "./components/FromInput";
import HobbiesInput from "./components/HobbiesInput";

export default function page() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("@johndoe");
  const [bio, setBio] = useState("Frontend developer");
  const [image, setImage] = useState("/images/random-image.jpg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log({
      name,
      username,
      bio,
    });

    // Send data to API here
  };

  return (
    <div className="h-screen flex justify-center items-center py-3">
      <div className="w-full h-full max-w-xl flex flex-col justify-center  overflow-y-auto backdrop-blur-2xl bg-amber-50/15 rounded-2xl shadow md:p-6">
        {/* Profile Photo */}
        <div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <label className="relative cursor-pointer">
              <div className="w-30 h-30 rounded-full overflow-hidden relative">
                <Image
                  src={image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-2 bg-sky-500 text-white rounded-full absolute z-10 left-2.5 bottom-2">
                <PenIcon size={15} />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name */}
          <div className="space-y-3 w-full px-6">
            <FormInput title="Name" />
            <div className="flex items-end justify-between gap-2">
              <FormInput title="Your Id" />
              <BirthDaate />
            </div>
            <div className="flex items-end justify-between gap-2">
              <DropDown options={[{ id: 1, name: "iran" }]} />
              <FormInput title="City" />
            </div>
            <div>
              <FormInput title="biography" />
            </div>
            <div>
              <HobbiesInput />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-sky-500 text-white py-3 rounded-xl font-medium hover:bg-sky-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
