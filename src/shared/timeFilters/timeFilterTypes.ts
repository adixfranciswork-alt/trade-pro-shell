export type TimeRangeKey =
  | "TODAY"
  | "YESTERDAY"
  | "THIS_WEEK"
  | "LAST_WEEK"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "LAST_3_MONTHS"
  | "THIS_YEAR"
  | "LAST_YEAR";

export type TimeRange = {
  from: string; // YYYY-MM-DD
  to: string;   // YYYY-MM-DD
};

export type TimeFiltersMeta = {
  enabled: boolean;
  defaultKey?: TimeRangeKey;
};

export type RouteHandle = {
  timeFilters?: TimeFiltersMeta;
};
