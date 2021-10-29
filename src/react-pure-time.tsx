import * as React from "react";
import dateformat from "./format";
import type { Props, State, Diff } from "./types";

const msAmountIn: Record<string, number> = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
};

const getRelativeTimeString = (
  time: number,
  absTime: number,
  unit: string,
  isFuture: boolean
): string => {
  const unitDecl =
    absTime % 100 === 1 || absTime % 10 === 1 ? unit : `${unit}s`;

  if (unit === "second" && time === 0) return "just now";
  if (unit === "year" && time === 0) return "this year";
  if (unit === "year" && time === 1) return "last year";

  return `${isFuture ? "will come in" : ""} ${absTime} ${unitDecl} ${
    isFuture ? "" : "ago"
  }`;
};

const isDate = (value: string | number | Date): boolean => {
  const testDate = new Date(value);
  if (Object.prototype.toString.call(testDate) !== "[object Date]")
    return false;
  return !isNaN(testDate.getTime());
};

const bestFit = (
  diff: Diff
): "year" | "month" | "week" | "day" | "hour" | "minute" | "second" => {
  const seconds = Math.abs(diff.seconds);
  const minutes = Math.abs(diff.minutes);
  const hours = Math.abs(diff.hours);
  const days = Math.abs(diff.days);
  const weeks = Math.abs(diff.weeks);
  const months = Math.abs(diff.months);
  const years = Math.abs(diff.years);

  switch (true) {
    case years > 0 && months > 11:
      return "year";
    case months > 0 && days > 27:
      return "month";
    case weeks > 0 && days > 6:
      return "week";
    case days > 0 && hours > 23:
      return "day";
    case hours > 0 && minutes > 59:
      return "hour";
    case minutes > 0 && seconds > 59:
      return "minute";
    default:
      return "second";
  }
};

const getInterval = (currentUnit: string) => {
  if (!currentUnit.length) return 10;
  if (!msAmountIn[currentUnit]) return msAmountIn.week;
  return msAmountIn[currentUnit];
};

const getRelativeTimeDiff = (value: Date): Diff => {
  const date = value;
  const now = new Date();

  const dateMs = date.getTime();
  const nowMs = now.getTime();

  const ms = nowMs - dateMs;

  const years = now.getFullYear() - date.getFullYear();
  const round = Math[ms > 0 ? "floor" : "ceil"];

  return {
    ms,
    seconds: round(ms / msAmountIn.second),
    minutes: round(ms / msAmountIn.minute),
    hours: round(ms / msAmountIn.hour),
    days: round(ms / msAmountIn.day),
    weeks: round(ms / msAmountIn.week),
    months: years * 12 + now.getMonth() - date.getMonth(),
    years,
  };
};

const calculateRelativeTime = (date: Date, currentUnit: string): string => {
  const diff = getRelativeTimeDiff(date);
  const diffkey = `${currentUnit}s` as
    | "ms"
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years";
  let time = diff[diffkey];
  let absTime = Math.abs(time);
  const isFuture = time < 0;

  if (currentUnit === "second") {
    let normTime = 45;
    if (absTime < 45) normTime = 20;
    if (absTime < 20) normTime = 5;
    if (absTime < 5) normTime = 0;
    if (absTime === 0) normTime = 0;
    time = isFuture ? -normTime : normTime;
    absTime = Math.abs(time);
  }

  return getRelativeTimeString(time, absTime, currentUnit, isFuture);
};

const Time = (props: Props) => {
  const {
    value = "",
    format = "d.m.Y H:i",
    placeholder = "—",
    className = "",
    utc = false,
    relativeTime,
  } = props;

  const [state, setState] = React.useState<State>({
    relativeTime: "",
    currentUnit: "",
  });

  React.useEffect(() => {
    let interval: null | number = null;
    if (props.relativeTime && isDate(props.value)) {
      const date = new Date(props.value);
      const diff = getRelativeTimeDiff(date);
      setState({
        ...state,
        currentUnit: props.unit || bestFit(diff),
      });

      setState({
        ...state,
        relativeTime: calculateRelativeTime(date, state.currentUnit),
      });
      interval = window.setInterval(() => {
        const date = new Date(props.value);
        const diff = getRelativeTimeDiff(date);
        setState({
          currentUnit: props.unit || bestFit(diff),
          relativeTime: calculateRelativeTime(
            date,
            props.unit || bestFit(diff)
          ),
        });
      }, getInterval(state.currentUnit));
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [props.relativeTime, props.value, props.unit, state.currentUnit]);

  return (
    <span className={className}>
      {isDate(value)
        ? relativeTime
          ? state.relativeTime
          : dateformat(new Date(value), format, utc)
        : placeholder}
    </span>
  );
};

export const format = dateformat;
export default Time;
