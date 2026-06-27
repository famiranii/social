import React from "react";
import Image from "next/image";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { type: string };
}) {
  const isLogin = params.type === "login";
  const isSignup = params.type === "signup";

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex items-center lg:h-screen justify-evenly px-10">
        <div className="w-150 h-150 md:w-125 xl:w-150">
          <Image
            src="/images/Group 8.png"
            alt="logins"
            width={600}
            height={600}
          />
        </div>
        <div className="absolute">{children}</div>
      </div>
      <div className="flex-1 lg:h-screen lg:overflow-y-scroll">
        <div className="w-full flex justify-center px-10">
          <div className="w-4xl">
            <div className="space-y-8 my-8">
              <h1 className="text-3xl xl:text-4xl font-bold text-gray-900">
                Meet people who truly match your vib💖
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed">
                A modern, safe, and intelligent way to meet new people, start
                real conversations, and build meaningful relationships that
                actually last — not just random matches.
              </p>

              <p className="text-red-700 text-base leading-relaxed bg-gray-200 p-4 rounded-md">
                Whether you're looking for friendship, dating, or something
                deeper, our platform helps you connect with people who genuinely
                fit your personality, interests, lifestyle, and emotional
                energy.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="text-pink-500 text-xl">✨</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Smart Compatibility Engine
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Our advanced matching system analyzes your interests,
                    behavior, preferences, and interaction patterns to suggest
                    people who actually align with your personality — not just
                    random profiles in your area. The more you use the app, the
                    smarter it gets.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-pink-500 text-xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Real & Meaningful Conversations
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Start chatting instantly with people who already showed
                    interest in you. No awkward introductions, no forced
                    conversations — just natural communication that flows easily
                    and feels authentic from the first message.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-pink-500 text-xl">🔒</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Privacy & Safety First
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    You are always in control. Decide who can see your profile,
                    who can message you, and what information is visible.
                    Advanced safety filters and verification systems help keep
                    fake accounts and unwanted interactions away from your
                    experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-pink-500 text-xl">❤️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Daily Curated Matches
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Every day, we bring you a fresh selection of potential
                    matches tailored specifically to your activity, preferences,
                    and behavior. No endless scrolling — just quality
                    connections delivered directly to you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-pink-500 text-xl">🌍</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Global Community
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Connect with people not only nearby but also from different
                    cultures, backgrounds, and perspectives. Expand your social
                    world and discover relationships you would never find in
                    your everyday routine.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-pink-500 text-xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Fast, Smooth Experience
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Built with performance in mind — everything is instant,
                    smooth, and responsive. From swiping to chatting, every
                    interaction is optimized for speed and comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="pt-6 border-t border-pink-100 space-y-2">
              <p className="text-gray-700 font-medium text-lg">
                Your next meaningful connection might be closer than you think.
              </p>

              <p className="text-gray-100 text-sm leading-relaxed">
                One simple login is all it takes to start a new story — a
                conversation, a friendship, or even something life-changing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
