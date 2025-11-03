import { cacheTag, cacheLife } from "next/cache";
import { getDateInTimezone } from "./time-utils";

export const timeInUTC = async () => {
  "use cache";
  cacheTag("time-in-utc");
  cacheLife("hours");
  console.log(`Fetching UTC time`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const now = getDateInTimezone("UTC");

  return now;
};
