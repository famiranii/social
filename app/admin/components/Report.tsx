import { ReportType } from "@/types/reportType";

export default function Report({ report }: { report: ReportType }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden my-2">
      <div className="bg-red-100 px-4 py-3 border-b border-red-200 flex items-center gap-2">
        <span className="text-red-600">🛡</span>
        <h3 className="text-sm font-semibold text-red-800">
          Security & Reports
        </h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="bg-white border border-red-100 rounded-lg p-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200 mb-1.5">
              Reported Against User {report.reported_user}
            </span>
            <p className="text-sm text-slate-700 font-medium">
              "{report.body}"
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Reporter ID
            </p>
            <p className="text-sm font-semibold text-slate-700">
              #{report.reporter_id} @{report.reporter_user}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
