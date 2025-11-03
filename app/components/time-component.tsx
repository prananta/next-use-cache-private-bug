import { TimeInAmerica, TimeInAsia, TimeInUTC } from "./time";
import { RefreshTime } from "./refresh-time";

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
    </div>
  );
};

export const TimeUTC = async () => {
  const time = await TimeInUTC();
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
  const time = await TimeInAsia();
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
  const time = await TimeInAmerica();
  return (
    <TimeContainer
      title="America"
      time={time}
      tag="time-in-america"
      directive="use cache: private"
    />
  );
};
