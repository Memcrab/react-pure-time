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
  relativeTime: string;
  currentUnit: string;
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
