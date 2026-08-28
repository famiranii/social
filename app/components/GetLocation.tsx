"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "./lib/api";
import { useAppSelector } from "@/store/hooks/redux";

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export default function GetLocation() {
  const id = useAppSelector((state) => state.userInfo.userInfo?.id);
  const hasGeo = typeof navigator !== "undefined" && !!navigator.geolocation;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(hasGeo); // true only if we'll attempt
  const [error, setError] = useState<string | null>(null);
  const attempted = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  const sendLocation = async (pos: GeolocationPosition) => {
    await api.post("info", {
      user_id: id,
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    if (attempted.current || !hasGeo) {
      if (!hasGeo) setOpen(true);
      return;
    }
    attempted.current = true;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await sendLocation(pos);
        } catch {
          // ignore server error on silent attempt
        } finally {
          setOpen(false);
          setLoading(false);
        }
      },
      () => {
        setOpen(true);
        setLoading(false);
      },
      GEO_OPTIONS,
    );
  }, []);

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await sendLocation(pos);
          setOpen(false);
        } catch {
          setError("Failed to save location. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location permission denied. Allow it from browser settings.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError("Location unavailable. Try again.");
        } else {
          setError("Request timed out. Try again.");
        }
      },
      GEO_OPTIONS,
    );
  };

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

        <h2 className="text-lg md:text-xl font-semibold mb-4">Location Access</h2>

        <p className="text-sm md:text-base mb-6 text-gray-300">
          Let us access your location to find people around you.
        </p>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

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
