"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserLocationMapWrapper from "../../components/UserLocationMap";
import { api } from "@/app/components/lib/api";
import { MapUser } from "@/types/mapUserType";

type UserLocationsResponse = {
  user: {
    username: string;
  };
  locations: { location: string }[];
  profile: { image: string };
};

export default function Page() {
  const params = useParams();
  const id = params.id;

  const [mapUserInfo, setMapUserInfo] = useState<MapUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLocations, setIsLocation] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getUserLocation = async () => {
      try {
        setLoading(true);

        const response = await api.post<UserLocationsResponse>(
          "user/locations",
          {
            id: Number(id),
          },
        );
        if (response.locations.length === 0) {
          setIsLocation(false);
          return;
        }
        const UserLocations = response.locations.map((loc) => {
          const [lat, lng] = loc.location
            .trim()
            .split(",")
            .map((value) => Number(value.trim()));

          return {
            name: response.user.username,
            avatar: `${process.env.NEXT_PUBLIC_IMAGE_URL}${response.profile.image}`,
            lat,
            lng,
          };
        });

        setMapUserInfo(UserLocations);
      } catch (error) {
        console.error(error);
        setMapUserInfo([]);
      } finally {
        setLoading(false);
      }
    };

    getUserLocation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isLocations) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 text-center shadow-lg">
          <div className="mb-4 text-5xl">📍</div>

          <h2 className="mb-2 text-xl font-semibold text-white">
            No Location Available
          </h2>

          <p className="text-sm text-gray-400">
            This user hasn&apos;t shared any location yet.
          </p>
        </div>
      </div>
    );
  }

  return <UserLocationMapWrapper users={mapUserInfo} />;
}
