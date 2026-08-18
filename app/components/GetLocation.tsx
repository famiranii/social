"use client";

import { useEffect, useState } from "react";
import { api } from "./lib/api";
import { useAppSelector } from "@/store/hooks/redux";

export default function GetLocation() {
  const id = useAppSelector((state) => state.userInfo.userInfo?.id);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const requestLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await api.post("info", {
            user_id: id,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        } catch (error) {
        } finally {
          setOpen(false);
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await api.post("info", {
            user_id: id,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        } catch (error) {
        } finally {
          setOpen(false);
          setLoading(false);
        }
      },
      () => {
        setOpen(true);
        setLoading(false);
      },
    );
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-600/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gray-800 text-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-lg">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Location Access
        </h2>

        <p className="text-sm md:text-base mb-6 text-gray-300">
          Let us access your location to find people around you.
        </p>

        {loading ? (
          <p className="text-xs text-gray-400">Checking location permission...</p>
        ) : (
          <button
            onClick={requestLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-xl transition"
          >
            Allow Location
          </button>
        )}
      </div>
    </div>
  );
}