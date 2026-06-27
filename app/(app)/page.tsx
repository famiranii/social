"use client";

import { useEffect } from "react";
import PersonalCard from "../components/Home/PersonalCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getUsersApi } from "@/store/featurs/getUsersSlice";

export default function Home() {
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(getUsersApi());
    };
    getUsers();
  }, []);

  return (
    <div className="font-sans p-8">
      <div className="flex flex-wrap gap-6 justify-center">
        {users.length === 0 && (
          <div className="bg-red-800 w-100 text-center p-10">
            <p>there isnt any user for this filter</p>
          </div>
        )}
        {users?.map((user, index) => (
          <PersonalCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}
