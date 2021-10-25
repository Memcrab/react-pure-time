export type Props = {
  className?: string;
  value?: string | number | Date;
  placeholder?: string;
  utc?: boolean;
  format?: string;
  relativeTime?: boolean;
  unit?: string;
};

export type State = {
  interval: null | number;
  currentUnit: string;
  relativeTime: string;
};

export type Diff = {
  ms: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
};
