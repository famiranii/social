import HomeHeader from "../components/Home/HomeHeader";
import GetLocation from "../components/GetLocation";
import ProtectedRoute from "./middleware";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <ProtectedRoute>
        <HomeHeader />
        <GetLocation />
        <main className="flex-1 overflow-hidden py-18">{children}</main>
      </ProtectedRoute>
    </div>
  );
}
