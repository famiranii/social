"use client";

import { useEffect } from "react";

export default function GetLocation() {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("lat:", pos.coords.latitude);
        console.log("lng:", pos.coords.longitude);
      },
      (err) => {
        console.log("error:", err.message);
      },
    );
  }, []);

  return <div></div>;
}
