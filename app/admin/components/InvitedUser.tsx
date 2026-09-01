"use client";

import { useState } from "react";
import { Check, CopyIcon } from "lucide-react";

type UserInfo = {
  id: number;
  username: string;
};

type InvitedUserProps = {
  users: UserInfo[];
  id: number;
};

export default function InvitedUser({ users, id }: InvitedUserProps) {
  const [copied, setCopied] = useState(false);

  const inviteLink = `${window.location.origin}/sign-up?code=${id}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy invite link:", error);
    }
  };

  return (
    <div className="col-span-3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Invited Users</h2>

        <p className="mt-1 text-sm text-slate-500">
          List of users invited by you
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
        <div className="space-y-3">
          {/* Invite Link */}
          <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]">
            <p className="mb-2 text-sm text-slate-400">Your invite link</p>

            <div className="flex items-center gap-3">
              <p className="min-w-0 flex-1 truncate text-sm text-slate-200">
                {inviteLink}
              </p>

              <div className="group relative shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400 active:scale-95"
                  aria-label="Copy invite link"
                >
                  {copied ? (
                    <Check size={18} className="text-emerald-400" />
                  ) : (
                    <CopyIcon size={18} />
                  )}
                </button>

                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Copy
                </span>
              </div>
            </div>
          </div>

          {/* Invited Users */}
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-semibold text-indigo-400">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-200">
                      {user.username}
                    </span>

                    <span className="text-xs text-slate-500">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              No invited users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
