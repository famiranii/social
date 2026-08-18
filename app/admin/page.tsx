"use client";

import { useEffect, useState } from "react";
import { api } from "../components/lib/api";
import Report from "./components/Report";
import { ReportType } from "@/types/reportType";
import ReportsByCountry from "./components/ReportsByCountry";
import InvitedUser from "./components/InvitedUser";
import { useAppSelector } from "@/store/hooks/redux";
import { InvitedUserType } from "@/types/InvitedTypes";

type countryType = {
  country: string;
  count: number;
};

export default function Page() {
  const userId = useAppSelector((state) => state.userInfo.userInfo.id);
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportPaginate, setReportPaginate] = useState(0);
  const [countriesInfo, setCountriesInfo] = useState<countryType[]>([]);
  const [invitedPeople, setInvitedPeople] = useState<InvitedUserType[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<{ data: ReportType[] }>(
          `reports/${reportPaginate}`,
        );

        setReports((prevReports) => {
          if (reportPaginate === 0) {
            return response.data;
          }

          return [...prevReports, ...response.data];
        });
      } catch (err) {
        setError("Failed to load reports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchCountryInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<{ data: countryType[] }>(
          "countries/users",
        );
        setCountriesInfo(response.data);
      } catch (err) {
        setError("Failed to load reports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryInfo();
    fetchReports();
  }, [reportPaginate]);

  useEffect(() => {
    if (userId === 0) return;
    const fetchInvitedInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.post<{ user: InvitedUserType[] }>(
          "invited/users",
          { id: userId },
        );
        setInvitedPeople(response.user);
      } catch (err) {
        setError("Failed to load invited users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvitedInfo();
  }, [userId]);

  if (loading && reports.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-400">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="w-full xl:grid grid-cols-9 gap-6">
      {/* Header */}
      <ReportsByCountry countriesInfo={countriesInfo} />
      <InvitedUser users={invitedPeople} id={userId} />
      <div className="col-span-3 mt-10 xl:mt-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Reports</h1>
        </div>

        {/* Reports Grid */}
        <div className="w-full max-h-[calc(100vh-150px)] overflow-auto">
          {reports.length > 0 ? (
            <div className="w-full">
              {reports.map((report, i) => (
                <Report key={i} report={report} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-slate-400">No reports found.</p>
            </div>
          )}

          {/* Show More */}

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setReportPaginate((page) => page + 1)}
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Loading..." : "Show More"}
            </button>
          </div>
          {/* Error while loading another page */}
          {error && reports.length > 0 && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
