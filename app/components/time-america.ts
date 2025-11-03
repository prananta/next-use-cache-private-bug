import { cacheTag, cacheLife } from "next/cache";
import { getDateInTimezone } from "./time-utils";
import { cookies } from "next/headers";

export const timeInAmerica = async () => {
  "use cache: private";
  cacheTag("time-in-america");
  cacheLife("hours");
  console.log(`Fetching America time`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const cookieStore = await cookies();
  console.log(cookieStore.getAll());

  const now = getDateInTimezone("America/New_York");

  return now;
};
