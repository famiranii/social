"use client";
import { useAppSelector } from "@/store/hooks/redux";
import UserLocationMapWrapper from "../components/UserLocationMap";

export default function Page() {
  const mapUserInfo = useAppSelector((state) => state.admin.mapUser);
  return <UserLocationMapWrapper users={mapUserInfo} />;
}
