"use client";

import { revalidateTime } from "./revalidate-time";
import { useLastSet } from "./track-time-change";

export const RefreshTime = ({
  tag,
  timezone,
}: {
  tag: string;
  timezone: "utc" | "asia" | "america";
}) => {
  const [setLastSet] = useLastSet();
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={() => {
        setLastSet(timezone);
        revalidateTime(tag);
      }}
    >
      Refresh
    </button>
  );
};
