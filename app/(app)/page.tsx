"use client";

import { useEffect, useState } from "react";
import PersonalCard from "../components/Home/PersonalCard";
import { api } from "../components/lib/api";
import { User } from "@/types/user";
import { ResponseType } from "@/types/responseType";
import { toast } from "sonner";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result: ResponseType = await api.get("users");
        console.log(result);
        setUsers(result.data);
        if (result.message === "token error") {
          toast.error("there is problme with your login . pleas try it again");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="font-sans p-8">
      <div className="flex flex-wrap gap-6 justify-center">
        {users?.map((user,index) => (
          <PersonalCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}
