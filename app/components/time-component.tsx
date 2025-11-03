import { RefreshTime } from "./refresh-time";
import { timeInAmerica } from "./time-america";
import { timeInAsia } from "./time-asia";
import { timeInUTC } from "./time-utc";

export const TimeContainer = ({
  title,
  time,
  tag,
  directive,
}: {
  title: string;
  time: string;
  tag: string;
  directive: "use cache" | "use cache: remote" | "use cache: private";
}) => {
  return (
    <div className="flex flex-col w-full justify-center border border-gray-300 rounded-md p-4 space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-4xl">{time}</p>
      <RefreshTime tag={tag} />
      <p className="text-sm text-gray-500">{directive}</p>
      <p className="text-sm text-gray-500">{`On click Refresh, only the time in this component should be updated. But it's not.`}</p>
    </div>
  );
};

export const TimeUTC = async () => {
  const time = await timeInUTC();
  return (
    <TimeContainer
      title="UTC"
      time={time}
      tag="time-in-utc"
      directive="use cache"
    />
  );
};

export const TimeAsia = async () => {
  const time = await timeInAsia();
  return (
    <TimeContainer
      title="Asia"
      time={time}
      tag="time-in-asia"
      directive="use cache: remote"
    />
  );
};

export const TimeAmerica = async () => {
  const time = await timeInAmerica();
  return (
    <TimeContainer
      title="America"
      time={time}
      tag="time-in-america"
      directive="use cache: private"
    />
  );
};
