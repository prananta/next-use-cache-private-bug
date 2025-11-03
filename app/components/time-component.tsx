import { RefreshTime } from "./refresh-time";
import { timeInAmerica } from "./time-america";
import { timeInAsia } from "./time-asia";
import { timeInUTC } from "./time-utc";
import { TimeDidChange } from "./track-time-change";

export const TimeContainer = ({
  title,
  time,
  tag,
  directive,
  timezone,
}: {
  title: string;
  time: string;
  tag: string;
  directive: "use cache" | "use cache: remote" | "use cache: private";
  timezone: "utc" | "asia" | "america";
}) => {
  return (
    <div className="flex flex-col w-full justify-center border border-gray-300 rounded-md p-4 space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-4xl">{time}</p>
      <RefreshTime tag={tag} timezone={timezone} />
      <p className="text-sm text-gray-500">{directive}</p>
      <p className="text-sm text-gray-500">{`On click Refresh, only the time in this component should be updated. But it's not.`}</p>
    </div>
  );
};

export const TimeUTC = async () => {
  const time = await timeInUTC();
  return (
    <>
      <TimeContainer
        title="UTC"
        time={time}
        tag="time-in-utc"
        directive="use cache"
        timezone="utc"
      />
      <TimeDidChange time={time} timezone="utc" />
    </>
  );
};

export const TimeAsia = async () => {
  const time = await timeInAsia();
  return (
    <>
      <TimeDidChange time={time} timezone="asia" />
      <TimeContainer
        title="Asia"
        time={time}
        tag="time-in-asia"
        directive="use cache: remote"
        timezone="asia"
      />
    </>
  );
};

export const TimeAmerica = async () => {
  const time = await timeInAmerica();
  return (
    <>
      <TimeDidChange time={time} timezone="america" />
      <TimeContainer
        title="America"
        time={time}
        tag="time-in-america"
        directive="use cache: private"
        timezone="america"
      />
    </>
  );
};
