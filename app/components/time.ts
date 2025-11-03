import { cacheLife, cacheTag } from "next/cache";

const getDateInTimezone = (timeZone: string): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatter.format(now);
};

export const TimeInUTC = async () => {
  "use cache";
  cacheTag("time-in-utc");
  cacheLife({ stale: 5 * 60 });
  console.log(`Fetching UTC time`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const now = getDateInTimezone("UTC");

  return now;
};

export const TimeInAsia = async () => {
  "use cache: remote";
  cacheTag("time-in-asia");
  cacheLife({ stale: 5 * 60 });
  console.log(`Fetching Asia time`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const now = getDateInTimezone("Asia/Tokyo");

  return now;
};

export const TimeInAmerica = async () => {
  "use cache: private";
  cacheTag("time-in-america");
  cacheLife({ stale: 5 * 60 });
  console.log(`Fetching America time`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const now = getDateInTimezone("America/New_York");

  return now;
};
