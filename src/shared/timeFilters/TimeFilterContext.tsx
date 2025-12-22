import React, { createContext, useContext, useMemo, useState } from "react";
import type { TimeRange, TimeRangeKey } from "./timeFilterTypes";
import { computeTimeRange } from "./timeFilterUtils";

type TimeFilterState = {
  rangeKey: TimeRangeKey;
  range: TimeRange;
  setRangeKey: (k: TimeRangeKey) => void;
};

const TimeFilterContext = createContext<TimeFilterState | null>(null);

export function TimeFilterProvider({ children }: { children: React.ReactNode }) {
  // Default global inicial (por agora): THIS_MONTH
  const [rangeKey, setRangeKey] = useState<TimeRangeKey>("THIS_MONTH");

  const range = useMemo(() => computeTimeRange(rangeKey), [rangeKey]);

  const value: TimeFilterState = useMemo(
    () => ({ rangeKey, range, setRangeKey }),
    [rangeKey, range]
  );

  return <TimeFilterContext.Provider value={value}>{children}</TimeFilterContext.Provider>;
}

export function useTimeFilter() {
  const ctx = useContext(TimeFilterContext);
  if (!ctx) throw new Error("useTimeFilter must be used within TimeFilterProvider");
  return ctx;
}
