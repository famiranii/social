"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0F1629] px-6 py-12">
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

      {/* Illustration */}
      <div
        aria-hidden="true"
        className="relative z-10 mb-8"
        style={{
          transform: `translateY(${floatY}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        <svg
          width="280"
          height="180"
          viewBox="0 0 280 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Broken bridge */}
          <path
            d="M20 140 Q70 100 110 140"
            stroke="#3B2F6E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M170 140 Q210 100 260 140"
            stroke="#3B2F6E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Gap sparks */}
          <circle cx="135" cy="128" r="3" fill="#FF6B6B" opacity="0.8" />
          <circle cx="145" cy="118" r="2" fill="#C4B5FD" opacity="0.9" />
          <circle cx="140" cy="135" r="2.5" fill="#FF6B6B" opacity="0.6" />
          {/* Left person – lavender */}
          <circle
            cx="68"
            cy="68"
            r="18"
            fill="#1A2340"
            stroke="#C4B5FD"
            strokeWidth="2"
          />
          <circle cx="63" cy="65" r="2.5" fill="#C4B5FD" />
          <circle cx="73" cy="65" r="2.5" fill="#C4B5FD" />
          <path
            d="M63 74 Q68 79 73 74"
            stroke="#C4B5FD"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="52"
            y="90"
            width="32"
            height="36"
            rx="8"
            fill="#1A2340"
            stroke="#C4B5FD"
            strokeWidth="2"
          />
          <path
            d="M84 100 Q108 90 120 108"
            stroke="#C4B5FD"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="120" cy="110" r="5" fill="#C4B5FD" />
          <line
            x1="62"
            y1="126"
            x2="58"
            y2="145"
            stroke="#C4B5FD"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="74"
            y1="126"
            x2="78"
            y2="145"
            stroke="#C4B5FD"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Right person – coral */}
          <circle
            cx="212"
            cy="68"
            r="18"
            fill="#1A2340"
            stroke="#FF6B6B"
            strokeWidth="2"
          />
          <circle cx="207" cy="65" r="2.5" fill="#FF6B6B" />
          <circle cx="217" cy="65" r="2.5" fill="#FF6B6B" />
          <path
            d="M207 74 Q212 79 217 74"
            stroke="#FF6B6B"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="196"
            y="90"
            width="32"
            height="36"
            rx="8"
            fill="#1A2340"
            stroke="#FF6B6B"
            strokeWidth="2"
          />
          <path
            d="M196 100 Q172 90 160 108"
            stroke="#FF6B6B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="160" cy="110" r="5" fill="#FF6B6B" />
          <line
            x1="206"
            y1="126"
            x2="202"
            y2="145"
            stroke="#FF6B6B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="218"
            y1="126"
            x2="222"
            y2="145"
            stroke="#FF6B6B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* ? */}
          <text
            x="140"
            y="78"
            textAnchor="middle"
            fontSize="28"
            fontWeight="900"
            fontFamily="sans-serif"
            fill="#9B8FBF"
            opacity="0.7"
          >
            ?
          </text>
        </svg>
      </div>

      {/* 404 */}
      <p
        aria-label="404"
        className="relative z-10 text-center font-black leading-none tracking-tighter"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "clamp(5rem,18vw,8rem)",
          background: "linear-gradient(135deg, #C4B5FD 30%, #FF6B6B 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </p>

      <h1 className="relative z-10 mb-3 text-center text-2xl font-extrabold text-[#F0EEFF] sm:text-3xl">
        This page got lost in the crowd
      </h1>

      <p className="relative z-10 mb-10 max-w-sm text-center text-sm leading-relaxed text-[#9B8FBF]">
        Looks like the connection got dropped. The page you&apos;re looking for
        has wandered off — but your next friend is still out there.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg,#7C3AED,#C4B5FD)",
            boxShadow: "0 4px 24px rgba(124,58,237,.35)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1L1 8h2.5V15h3v-4h3v4h3V8H15L8 1z" />
          </svg>
          Go home
        </Link>
      </div>
    </div>
  );
}
