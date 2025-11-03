"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const TimeContext = createContext<{
  utcTime: string;
  asiaTime: string;
  americaTime: string;
  setUtcTime: (time: string) => void;
  setAsiaTime: (time: string) => void;
  setAmericaTime: (time: string) => void;
  lastSet: "utc" | "asia" | "america" | null;
  setLastSet: (lastSet: "utc" | "asia" | "america" | null) => void;
}>({
  utcTime: "",
  asiaTime: "",
  americaTime: "",
  setUtcTime: () => {},
  setAsiaTime: () => {},
  setAmericaTime: () => {},
  lastSet: null,
  setLastSet: () => {},
});

export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [utcTime, setUtcTime] = useState("");
  const [asiaTime, setAsiaTime] = useState("");
  const [americaTime, setAmericaTime] = useState("");
  const [lastSet, setLastSet] = useState<"utc" | "asia" | "america" | null>(
    null
  );

  return (
    <TimeContext.Provider
      value={{
        utcTime,
        asiaTime,
        americaTime,
        setUtcTime,
        setAsiaTime,
        setAmericaTime,
        lastSet,
        setLastSet,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeChange = () => {
  const context = useContext(TimeContext);

  const timeDidChange = useCallback(
    (time: string, timezone: "utc" | "asia" | "america") => {
      if (timezone === "america") {
        context.setAmericaTime(time);
      } else if (timezone === "asia") {
        context.setAsiaTime(time);
      } else {
        context.setUtcTime(time);
      }
    },
    [context]
  );

  return [timeDidChange] as const;
};

export const useLastSet = () => {
  const context = useContext(TimeContext);
  const setLastSet = useCallback(
    (lastSet: "utc" | "asia" | "america" | null) => {
      context.setLastSet(lastSet);
    },
    [context]
  );
  return [setLastSet] as const;
};

export const TimeDidChange = ({
  time,
  timezone,
}: {
  time: string;
  timezone: "utc" | "asia" | "america";
}) => {
  const [timeDidChange] = useTimeChange();
  useEffect(() => {
    timeDidChange(time, timezone);
  }, [time, timezone, timeDidChange]);
  return <></>;
};

type MessageAction = { type: "ADD_MESSAGES"; messages: string[] };

const messagesReducer = (state: string[], action: MessageAction): string[] => {
  if (action.type === "ADD_MESSAGES") {
    return [...state, ...action.messages];
  }
  return state;
};

export const TimeChanges = () => {
  const context = useContext(TimeContext);

  const previousTimeAsiaRef = useRef<string>("");
  const previousTimeAmericaRef = useRef<string>("");
  const previousTimeUtcRef = useRef<string>("");
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(() => {
    dispatchMessages({
      type: "ADD_MESSAGES",
      messages: ["🔄 Last set changed to " + context.lastSet],
    });
  }, [context.lastSet]);

  useEffect(() => {
    const newMessages: string[] = [];

    if (
      previousTimeAsiaRef.current !== context.asiaTime &&
      context.asiaTime !== ""
    ) {
      if (previousTimeAsiaRef.current !== "" && context.lastSet !== "asia") {
        newMessages.push(
          '<span style="color: red; padding-left: 10px;">❌ Unexpected Asia time change!</span>'
        );
      }
      previousTimeAsiaRef.current = context.asiaTime;
    }
    if (
      previousTimeAmericaRef.current !== context.americaTime &&
      context.americaTime !== ""
    ) {
      if (
        previousTimeAmericaRef.current !== "" &&
        context.lastSet !== "america"
      ) {
        newMessages.push(
          '<span style="color: red; padding-left: 10px;">❌ Unexpected America time change!</span>'
        );
      }
      previousTimeAmericaRef.current = context.americaTime;
    }
    if (
      previousTimeUtcRef.current !== context.utcTime &&
      context.utcTime !== ""
    ) {
      if (previousTimeUtcRef.current !== "" && context.lastSet !== "utc") {
        newMessages.push(
          '<span style="color: red; padding-left: 10px;">❌ Unexpected UTC time change!</span>'
        );
      }
      previousTimeUtcRef.current = context.utcTime;
    }

    if (newMessages.length > 0) {
      dispatchMessages({ type: "ADD_MESSAGES", messages: newMessages });
    } else {
      dispatchMessages({
        type: "ADD_MESSAGES",
        messages: [
          '<span style="color: green; padding-left: 10px;">✅ No unexpected time changes</span>',
        ],
      });
    }
  }, [context.asiaTime, context.americaTime, context.utcTime, context.lastSet]);

  return (
    <div className="text-sm text-gray-500">
      <h1 className="text-2xl font-bold">Time Changes</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li
              key={`${message}-${index}`}
              dangerouslySetInnerHTML={{ __html: message }}
            ></li>
          ))}
        </ul>
      ) : (
        <p>No time changes</p>
      )}
    </div>
  );
};
