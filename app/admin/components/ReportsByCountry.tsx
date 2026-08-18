"use client";

type CountryInfo = {
  country: string | null;
  count: number;
};

type ReportsByCountryProps = {
  countriesInfo: CountryInfo[];
};

export default function ReportsByCountry({
  countriesInfo,
}: ReportsByCountryProps) {
  const maxCount = Math.max(
    ...countriesInfo.map((item) => item.count),
    0
  );

  return (
    <div className="col-span-3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Reports by Country
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Report distribution by country
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
        {countriesInfo.length > 0 ? (
          <div className="space-y-5">
            {countriesInfo.map((country) => {
              const percentage =
                maxCount > 0
                  ? (country.count / maxCount) * 100
                  : 0;

              const countryName =
                country.country ?? "Unknown";

              return (
                <div key={country.country ?? "unknown"}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-semibold text-indigo-400">
                        {countryName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span className="text-sm font-medium text-slate-200">
                        {countryName}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-white">
                      {country.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-slate-500">
            No country data available.
          </div>
        )}
      </div>
    </div>
  );
}
