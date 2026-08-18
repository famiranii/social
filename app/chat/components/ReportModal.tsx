"use client";

import { api } from "@/app/components/lib/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ReportForm = {
  report_text: string;
};

type ReportModalProps = {
  reported_id: number;
  closeModal: () => void;
  reported_username: string;
};

export default function ReportModal({
  reported_id,
  closeModal,
  reported_username,
}: ReportModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportForm>();

  const onSubmit = async (data: ReportForm) => {
    const reportData = {
      reported_id,
      body: data.report_text,
      reported_user: reported_username,
    };
    try {
      await api.post("report/user", reportData);

      toast.success("report was successful");

      closeModal();
    } catch (error) {
      toast.error("there is problem with your try");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      {/* Modal */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Create Report
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Report a user or inappropriate content.
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Reported User */}
        <div className="mb-5 rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-slate-500">Reported User</p>

          <p className="mt-1 text-sm font-medium text-white">
            User #{reported_id}
          </p>
        </div>

        {/* Report Text */}
        <div className="mb-6">
          <label
            htmlFor="report_text"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Report
          </label>

          <textarea
            id="report_text"
            {...register("report_text", {
              required: "Report description is required",
              minLength: {
                value: 5,
                message: "Report must be at least 5 characters",
              },
            })}
            placeholder="Describe the reason for this report..."
            rows={5}
            className={`w-full resize-none rounded-lg border bg-transparent p-3 text-sm text-white outline-none placeholder:text-slate-500 ${
              errors.report_text
                ? "border-red-500 focus:border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />

          {errors.report_text && (
            <p className="mt-1 text-xs text-red-400">
              {errors.report_text.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
