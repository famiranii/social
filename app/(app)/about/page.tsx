import Link from "next/link";

const values = [
  {
    icon: "🤝",
    title: "Real connections",
    body: "We match people based on shared hobbies, location, and vibe — not follower counts.",
  },
  {
    icon: "🔒",
    title: "Privacy first",
    body: "Your data stays yours. We never sell it, and you control exactly what others see.",
  },
  {
    icon: "🌍",
    title: "Everyone belongs",
    body: "Friendship has no borders. Our community spans dozens of countries and keeps growing.",
  },
  {
    icon: "✨",
    title: "No algorithms, no ads",
    body: "Your feed is chronological. No engagement traps, no promoted posts, no noise.",
  },
];

const stats = [
  { value: "50K+", label: "Members worldwide" },
  { value: "120+", label: "Countries represented" },
  { value: "1M+", label: "Connections made" },
  { value: "4.9★", label: "Average rating" },
];

export default function Page() {
  return (
    <div
      className="min-h-screen text-[#F9FAFB]"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden">
        {/* Orbital SVG */}
        <div className="mb-10 select-none" aria-hidden="true">
          <svg
            width="220"
            height="140"
            viewBox="0 0 220 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arc */}
            <path
              d="M 40 70 Q 110 10 180 70"
              stroke="url(#arcGrad)"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 40 70 Q 110 130 180 70"
              stroke="url(#arcGrad2)"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.4"
            />
            {/* Left node */}
            <circle
              cx="40"
              cy="70"
              r="22"
              fill="#1e1b4b"
              stroke="#818CF8"
              strokeWidth="2"
            />
            <text x="40" y="75" textAnchor="middle" fontSize="18">
              👤
            </text>
            {/* Right node */}
            <circle
              cx="180"
              cy="70"
              r="22"
              fill="#1e1b4b"
              stroke="#FB7185"
              strokeWidth="2"
            />
            <text x="180" y="75" textAnchor="middle" fontSize="18">
              👤
            </text>
            {/* Center spark */}
            <circle cx="110" cy="44" r="5" fill="#818CF8" opacity="0.9" />
            <circle cx="110" cy="44" r="9" fill="#818CF8" opacity="0.2" />
            <defs>
              <linearGradient
                id="arcGrad"
                x1="40"
                y1="70"
                x2="180"
                y2="70"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#FB7185" />
              </linearGradient>
              <linearGradient
                id="arcGrad2"
                x1="40"
                y1="70"
                x2="180"
                y2="70"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#FB7185" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4">
          About Bondly
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-2xl">
          Built for the people
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg,#818CF8,#FB7185)",
            }}
          >
            still looking for their people
          </span>
        </h1>
        <p className="mt-6 text-base text-[#94A3B8] max-w-md leading-7">
          Bondly started with a simple belief: making a genuine friend as an
          adult shouldn't feel impossible. So we built the space where it isn't.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/sign-up"
            className="px-6 py-3 rounded-2xl text-sm font-bold text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-500/10 transition-all"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-6 px-4 rounded-2xl border border-white/8"
              style={{ background: "#0d1117" }}
            >
              <span className="text-2xl font-extrabold text-white">
                {s.value}
              </span>
              <span className="mt-1 text-xs text-[#94A3B8] text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section className="px-6 pb-24">
        <div
          className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 border border-white/8"
          style={{ background: "#0d1117" }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-400 mb-5">
            Our story
          </p>
          <p className="text-[#94A3B8] leading-8 text-sm">
            After moving to a new city in 2022, our founder spent months feeling
            invisible in a crowd of millions. Dating apps weren't the answer.
            LinkedIn felt transactional. Group chats never went anywhere real.
          </p>
          <p className="mt-4 text-[#94A3B8] leading-8 text-sm">
            So they built Bondly — a place to share who you actually are: your
            hobbies, your city, your sense of humor. A place where the first
            message doesn't have to be awkward because you already know you have
            something in common.
          </p>
          <p className="mt-4 text-[#94A3B8] leading-8 text-sm">
            Today Bondly is home to over 50,000 people across 120 countries. The
            friendships are real. The community is kind. And the loneliness? A
            lot more manageable.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-3 text-center">
            What we stand for
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
            The principles we build on
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl p-6 border border-white/8 hover:border-indigo-500/30 transition-colors"
                style={{ background: "#0d1117" }}
              >
                <span className="text-2xl">{v.icon}</span>
                <h3 className="mt-3 font-bold text-white text-base">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-[#94A3B8] leading-6">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-28">
        <div
          className="max-w-2xl mx-auto rounded-3xl p-10 text-center border border-indigo-500/20 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#1e1b4b 0%,#0d1117 100%)",
          }}
        >
          <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-indigo-500 opacity-10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-rose-500 opacity-10 blur-3xl" />
          <h2 className="text-2xl sm:text-3xl font-extrabold relative z-10">
            Your next friend is already here
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8] relative z-10">
            Sign up free. No credit card. No algorithm. Just people.
          </p>
          <Link
            href="/sign-up"
            className="mt-7 inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold text-white relative z-10 transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg,#6366f1,#818CF8)",
              boxShadow: "0 4px 24px rgba(99,102,241,.4)",
            }}
          >
            Get started
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
