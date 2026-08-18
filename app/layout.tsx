import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import GetUserInfo from "./components/GetUserInfo";
import BackGround from "./components/BackGraound";
import CoverForDropdwons from "./components/CoverForDropdwons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "machest",
    template: "%s | Your Website Name",
  },
  description:
    "Your Website Name is a modern platform for connecting with people, discovering users, and communicating online.",
  keywords: [
    "social platform",
    "chat",
    "users",
    "online community",
    "messaging",
    "connect with people",
  ],
  authors: [{ name: "machers" }],
  creator: "machers",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONT_API_URL || "http://localhost:3000",
  ),

  openGraph: {
    title: "matches",
    description: "Connect with people, discover users, and communicate online.",
    type: "website",
    siteName: "matches",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "matches",
    description: "Connect with people, discover users, and communicate online.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BackGround />
        <Providers>
          <CoverForDropdwons />
          <GetUserInfo />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                success: "!bg-green-600 !text-white",
                error: "!bg-red-600 !text-white",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
