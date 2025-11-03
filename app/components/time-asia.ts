import { cacheTag, cacheLife } from "next/cache";
import { getDateInTimezone } from "./time-utils";

export const timeInAsia = async () => {
  "use cache: remote";
  cacheTag("time-in-asia");
  cacheLife("hours");
  console.log(`Fetching Asia time`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const now = getDateInTimezone("Asia/Tokyo");

  return now;
};
