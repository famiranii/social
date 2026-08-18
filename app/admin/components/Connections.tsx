"use client";

import { api } from "@/app/components/lib/api";
import { UserAllInfo } from "@/types/userAllInfoType";
import { useState } from "react";

interface ConnectionUser {
  id: number;
  username: string;
  email: string;
}

interface FollowResponse {
  followers: {
    follower_id: number;
    follower_user: ConnectionUser;
    following_id: number;
  } | null;
  following: ConnectionUser[];
  input_user: ConnectionUser;
}

export default function Connections({ info }: { info: UserAllInfo }) {
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState<FollowResponse | null>(null);

  const handleConnectoinClicked = async () => {
    try {
      setLoading(true);

      const response = await api.post<FollowResponse>("info/follow", {
        id: info.id,
      });

      setConnections(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const followersCount = connections?.followers ? 1 : 0;

  const followingCount = connections?.following?.length ?? 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Connections</h3>
      </div>

      <div>
        <div
          onClick={handleConnectoinClicked}
          className="flex cursor-pointer items-center justify-between border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Following
            </p>

            <p className="mt-0.5 text-sm font-medium text-indigo-600">
              {info.following}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Followers
            </p>

            <p className="mt-0.5 text-sm font-medium text-indigo-600">
              {info.followers}
            </p>
          </div>

          <span className="text-lg text-slate-300">👥</span>
        </div>

        {connections?.followers && (
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Follower
            </p>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                {connections.followers.follower_user.username
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  {connections.followers.follower_user.username}
                </p>

                <p className="text-xs text-slate-400">
                  {connections.followers.follower_user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {connections?.following && connections.following.length > 0 && (
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Following
            </p>

            <div className="space-y-3">
              {connections.following.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {user.username}
                    </p>

                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-slate-50">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Liked
            </p>

            <p className="mt-0.5 text-sm font-medium text-indigo-600">
              {info.like_count}
            </p>
          </div>

          <span className="text-lg text-slate-300">👍</span>
        </div>
      </div>
    </div>
  );
}
