"use client";

import { useEffect } from "react";
import PersonalCard from "../components/Home/PersonalCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getUsersApi } from "@/store/featurs/getUsersSlice";
import Loading from "../components/Loading";

export default function Home() {
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(getUsersApi());
    };
    getUsers();
  }, []);
  console.log(status);

  return (
    <div className="font-sans p-8">
      {status === "loading" && (
        <div className="h-screen w-full flex items-center justify-center">
          <Loading width={60} />
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-center">
        {users.length === 0 && status === "success" && (
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
