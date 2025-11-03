"use client";

import { revalidateTime } from "./revalidate-time";

export const RefreshTime = ({ tag }: { tag: string }) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={() => {
        revalidateTime(tag);
      }}
    >
      Refresh
    </button>
  );
};
