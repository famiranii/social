"use client";

import { MapUser } from "@/types/mapUserType";
import type * as LType from "leaflet";
import { useEffect, useRef, useState } from "react";
import { createMyLocationIcon } from "./MapIcons";

function createUserIcon(
  L: typeof LType,
  avatarUrl: string,
  name: string,
): LType.DivIcon {
  const html = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
    ">
      <div style="
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 3px solid #fff;
        overflow: hidden;
        background: #e0e0e0;
      ">
        <img
          src="${avatarUrl}"
          alt="${name}"
          style="width:100%;height:100%;object-fit:cover;"
          onerror="this.style.display='none';this.parentElement.innerHTML='<div style=width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;color:#555>${name[0]}</div>'"
        />
      </div>
      <div style="
        background: #fff;
        border-radius: 20px;
        padding: 2px 10px;
        font-size: 12px;
        font-weight: 600;
        color: #222;
        white-space: nowrap;
        box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        font-family: Vazirmatn, Tahoma, sans-serif;
      ">${name}</div>
      <div style="
        width: 8px;
        height: 8px;
        background: #4285f4;
        border: 2px solid #fff;
        border-radius: 50%;
        margin-top: -2px;
      "></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [80, 90],
    iconAnchor: [40, 88],
  });
}

export default function UserLocationMap({ users = [] }: { users: MapUser[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LType.Map | null>(null);
  const leafletRef = useRef<typeof LType | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "denied" | "error"
  >("idle");

  useEffect(() => {
    let cancelled = false;

    import("leaflet").then(async (mod) => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      // جلوگیری از initialize شدن دوباره container
      if ((mapRef.current as any)._leaflet_id) {
        return;
      }

      const L = mod.default as typeof LType;
      leafletRef.current = L;

      const map = L.map(mapRef.current, {
        center: [35.6892, 51.389],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      users.forEach((user) => {
        if (user.lat && user.lng) {
          const icon = createUserIcon(L, user.avatar, user.name);

          L.marker([user.lat, user.lng], {
            icon,
          }).addTo(map);
        }
      });
    });

    return () => {
      cancelled = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  const locateUser = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const map = mapInstanceRef.current!;
        const L = leafletRef.current!;

        map.setView([lat, lng], 12, { animate: true });

        const user = users.find((u) => !u.lat && !u.lng);
        if (user) {
          const icon = createUserIcon(L, user.avatar, user.name);
          L.marker([lat, lng], { icon }).addTo(map);
        } else {
          const icon = createMyLocationIcon(L);
          L.marker([lat, lng], { icon, zIndexOffset: 1000 }).addTo(map);
        }
        setStatus("success");
      },
      () => setStatus("denied"),
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        fontFamily: "Vazirmatn, Tahoma, sans-serif",
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      <button
        onClick={locateUser}
        disabled={status === "loading"}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          padding: "10px 24px",
          background: "#4285f4",
          color: "#fff",
          border: "none",
          borderRadius: 24,
          fontSize: 14,
          fontWeight: 600,
          cursor: status === "loading" ? "wait" : "pointer",
          boxShadow: "0 2px 12px rgba(66,133,244,0.4)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          direction: "rtl",
        }}
      >
        {status === "loading" ? "در حال یافتن موقعیت…" : "نمایش موقعیت من"}
      </button>

      {status === "denied" && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background: "#fff3cd",
            color: "#856404",
            padding: "8px 20px",
            borderRadius: 12,
            fontSize: 13,
            direction: "rtl",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          دسترسی به موقعیت مکانی رد شد
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background: "#f8d7da",
            color: "#721c24",
            padding: "8px 20px",
            borderRadius: 12,
            fontSize: 13,
            direction: "rtl",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          مرورگر از Geolocation پشتیبانی نمی‌کند
        </div>
      )}
    </div>
  );
}
