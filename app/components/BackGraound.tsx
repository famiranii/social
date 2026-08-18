"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BackGround() {
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      setFloatY(Math.sin(t * 1.2) * 8);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const stars = [
    { top: "12%", left: "8%", size: 3, delay: "0s", duration: "2.5s" },
    { top: "22%", left: "88%", size: 2, delay: "0.8s", duration: "2.8s" },
    { top: "55%", left: "5%", size: 2, delay: "1.4s", duration: "3.1s" },
    { top: "70%", left: "92%", size: 3, delay: "0.3s", duration: "2.6s" },
    { top: "85%", left: "20%", size: 2, delay: "1.1s", duration: "3.4s" },
    { top: "35%", left: "95%", size: 2, delay: "2s", duration: "2.9s" },
    { top: "10%", left: "50%", size: 2, delay: "0.5s", duration: "3s" },
    { top: "90%", left: "60%", size: 3, delay: "1.7s", duration: "2.7s" },
  ];

  return (
    <div className="fixed inset-0 -z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0F1629] px-6 py-12">
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-violet-400 opacity-20 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-rose-400 opacity-20 blur-[80px]" />

      {/* Stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white opacity-40"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
