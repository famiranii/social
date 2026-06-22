"use client";

import { useState } from "react";

export default function HobbiesInput() {
  const [hobby, setHobby] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);

  const addHobby = () => {
    if (!hobby.trim()) return;
    if (hobbies.length >= 5) return;

    setHobbies([...hobbies, hobby]);
    setHobby("");
  };

  const removeHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Input + button */}
      <div className="flex gap-2">
        <input
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          placeholder="Add a hobby"
          className="flex-1 border-b border-gray-300 focus:border-sky-500 outline-none py-2 bg-transparent"
        />

        <button
          onClick={addHobby}
          disabled={hobbies.length >= 5}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg disabled:opacity-40"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="flex flex-wrap gap-2 h-15">
        {hobbies.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-600 px-3 h-7 rounded-full text-sm"
          >
            <span>{item}</span>

            <button
              onClick={() => removeHobby(index)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
