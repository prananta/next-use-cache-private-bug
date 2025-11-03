import { Suspense } from "react";
import { TimeAmerica, TimeAsia, TimeUTC } from "./components/time-component";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col space-y-4 w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Suspense fallback={<div>Loading...</div>}>
          <TimeUTC />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TimeAsia />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TimeAmerica />
        </Suspense>
      </main>
    </div>
  );
}
