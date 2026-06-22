"use client";

import { useEffect, useState } from "react";

export default function GetLocation() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      setLoading(false);
      return;
    }

    // Optional: check permission first (supported in most modern browsers)
    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((result) => {
          if (result.state === "granted") {
            setOpen(false); // already allowed → don’t show modal
          }
        })
        .catch(() => {});
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("lat:", pos.coords.latitude);
        console.log("lng:", pos.coords.longitude);

        // we have location access → hide modal
        setOpen(false);
        setLoading(false);
      },
      (err) => {
        console.log("error:", err.message);
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

        {loading && (
          <p className="text-xs text-gray-400">
            Checking location permission...
          </p>
        )}
      </div>
    </div>
  );
}
