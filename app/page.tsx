import { Suspense } from "react";
import { TimeAmerica, TimeAsia, TimeUTC } from "./components/time-component";
import { TimeChanges } from "./components/track-time-change";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-row space-x-4 w-full py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <TimeUTC />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <TimeAsia />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <TimeAmerica />
          </Suspense>
        </div>

        <div>
          <TimeChanges />
        </div>
      </main>
    </div>
  );
}
