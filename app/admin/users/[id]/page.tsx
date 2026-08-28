"use client";

import Link from "next/link";
import Report from "../../components/Report";
import { useEffect, useState } from "react";
import { api } from "@/app/components/lib/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { UserAllInfo } from "@/types/userAllInfoType";
import Connections from "../../components/Connections";
import { useAppDispatch } from "@/store/hooks/redux";
import { setMapUser } from "@/store/featurs/adminActionsSlice";
import { userInfo } from "os";

export default function AdminUserDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [info, setInfo] = useState<UserAllInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        if (params.id !== "none" && params.id) {
          const response = await api.post<{ user: UserAllInfo }>("user/data", {
            id: +params.id,
          });
          setInfo(response.user);
        } else {
          const response = await api.post<{ user: UserAllInfo }>("user/data", {
            username,
          });
          setInfo(response.user);
        }
      } catch (err) {
        setError("Failed to load user");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);
  const handleInfoclicked = (label: string) => {
    if (info) {
      router.push("/admin/map");
      dispatch(
        setMapUser({
          name: info?.username,
          lat: +info.lat,
          lng: +info?.lon,
          avatar: info?.username,
        }),
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Loading client...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Client not found.</p>
      </div>
    );
  }

  const initials = `${info.first_name?.[0] ?? ""}${
    info.last_name?.[0] ?? ""
  }`.toUpperCase();

  return (
    <div className="flex min-h-screen font-sans justify-center w-full">
      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Page content */}
        <div className="flex-1 overflow-x-hidden p-5">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/admin/users"
              className="flex items-center gap-1 transition-colors hover:text-indigo-600"
            >
              ← Back to Client List
            </Link>

            <span>/</span>

            <span className="text-slate-700">Client Details</span>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            {/* Left column */}
            <div className="flex flex-col gap-4 xl:col-span-4">
              {/* Profile card */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-col items-center border-b border-slate-100 p-6 text-center">
                  <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-indigo-100 text-2xl font-semibold text-indigo-600 shadow-sm">
                    {initials}
                  </div>

                  <h2 className="mb-1 text-base font-semibold text-slate-800">
                    {info.first_name} {info.last_name}
                  </h2>

                  <span className="mb-4 rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                    {info.job}
                  </span>
                </div>

                <div className="p-5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Biography
                  </p>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {info.biography}
                  </p>
                </div>
              </div>

              {/* Information card */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Information
                  </h3>

                  <button className="text-sm text-slate-400 transition-colors hover:text-indigo-600">
                    ✏
                  </button>
                </div>

                <div className="space-y-4 p-4">
                  {[
                    {
                      icon: "✉",
                      label: "Email",
                      value: info.email,
                      accent: true,
                    },
                    {
                      icon: "🎂",
                      label: "Birthday",
                      value: info.birthday,
                    },
                    {
                      icon: "👤",
                      label: "Gender",
                      value: info.sex,
                    },
                    {
                      icon: "📍",
                      label: "Location",
                      value: `${info.city}, ${info.country}`,
                    },
                    {
                      icon: "🌐",
                      label: "Coordinates",
                      value: `${info.lon}, ${info.lat}`,
                    },
                  ].map(({ icon, label, value, accent }) => (
                    <div key={label} className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-base text-slate-400">
                          {icon}
                        </span>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            {label}
                          </p>

                          <p
                            className={`mt-0.5 text-sm font-medium ${
                              accent ? "text-indigo-600" : "text-slate-700"
                            }`}
                          >
                            {value}
                          </p>
                        </div>
                      </div>
                      {label === "Coordinates" && (
                        <button className="bg-blue-400 p-2 rounded-2xl" onClick={() => handleInfoclicked(label)}>
                          Show on the map{" "}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Hobbies */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Hobbies
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 p-4">
                  {info.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 xl:col-span-8">
              {/*  Connections */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Connections */}
                <Connections info={info} />
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-800">
                    Reports
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {info.reports.map((report, i) => (
                      <Report key={i} report={report} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reports */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
