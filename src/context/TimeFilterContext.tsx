import React, { createContext, useContext, useMemo, useState } from "react";

export type TimePreset =
  | "TODAY"
  | "YESTERDAY"
  | "THIS_WEEK"
  | "LAST_WEEK"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "LAST_3_MONTHS"
  | "THIS_YEAR"
  | "LAST_YEAR"
  | "RESET";

export type DateRange = {
  startISO: string | null;
  endISO: string | null;
};

type TimeFilterState = {
  preset: TimePreset;
  range: DateRange;
  setPreset: (p: TimePreset) => void;
  reset: () => void;
};

const TimeFilterContext = createContext<TimeFilterState | null>(null);

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function startOfWeek(d: Date) {
  // Week starts Monday (Portugal / EU convention)
  const x = startOfDay(d);
  const day = x.getDay(); // 0=Sun,1=Mon...
  const diff = (day === 0 ? -6 : 1 - day);
  x.setDate(x.getDate() + diff);
  return x;
}

function endOfWeek(d: Date) {
  const x = startOfWeek(d);
  x.setDate(x.getDate() + 6);
  return endOfDay(x);
}

function startOfMonth(d: Date) {
  const x = startOfDay(d);
  x.setDate(1);
  return x;
}

function endOfMonth(d: Date) {
  const x = startOfMonth(d);
  x.setMonth(x.getMonth() + 1);
  x.setDate(0);
  return endOfDay(x);
}

function startOfYear(d: Date) {
  const x = startOfDay(d);
  x.setMonth(0, 1);
  return x;
}

function endOfYear(d: Date) {
  const x = startOfYear(d);
  x.setFullYear(x.getFullYear() + 1);
  x.setDate(0);
  return endOfDay(x);
}

function toISO(d: Date) {
  return d.toISOString();
}

export function computeRange(preset: TimePreset, now = new Date()): DateRange {
  const today = now;
  switch (preset) {
    case "TODAY": {
      const s = startOfDay(today);
      const e = endOfDay(today);
      return { startISO: toISO(s), endISO: toISO(e) };
    }
    case "YESTERDAY": {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      return { startISO: toISO(startOfDay(y)), endISO: toISO(endOfDay(y)) };
    }
    case "THIS_WEEK": {
      return { startISO: toISO(startOfWeek(today)), endISO: toISO(endOfWeek(today)) };
    }
    case "LAST_WEEK": {
      const s = startOfWeek(today);
      s.setDate(s.getDate() - 7);
      const e = endOfWeek(s);
      return { startISO: toISO(s), endISO: toISO(e) };
    }
    case "THIS_MONTH": {
      return { startISO: toISO(startOfMonth(today)), endISO: toISO(endOfMonth(today)) };
    }
    case "LAST_MONTH": {
      const s = startOfMonth(today);
      s.setMonth(s.getMonth() - 1);
      const e = endOfMonth(s);
      return { startISO: toISO(s), endISO: toISO(e) };
    }
    case "LAST_3_MONTHS": {
      const s = startOfMonth(today);
      s.setMonth(s.getMonth() - 2); // inclusive: this month + previous 2
      const e = endOfMonth(today);
      return { startISO: toISO(s), endISO: toISO(e) };
    }
    case "THIS_YEAR": {
      return { startISO: toISO(startOfYear(today)), endISO: toISO(endOfYear(today)) };
    }
    case "LAST_YEAR": {
      const s = startOfYear(today);
      s.setFullYear(s.getFullYear() - 1);
      const e = endOfYear(s);
      return { startISO: toISO(s), endISO: toISO(e) };
    }
    case "RESET":
    default:
      return { startISO: null, endISO: null };
  }
}

export function TimeFilterProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = useState<TimePreset>("TODAY");

  const range = useMemo(() => computeRange(preset), [preset]);

  const value = useMemo<TimeFilterState>(() => {
    return {
      preset,
      range,
      setPreset: (p) => setPresetState(p),
      reset: () => setPresetState("RESET"),
    };
  }, [preset, range]);

  return <TimeFilterContext.Provider value={value}>{children}</TimeFilterContext.Provider>;
}

export function useTimeFilter() {
  const ctx = useContext(TimeFilterContext);
  if (!ctx) throw new Error("useTimeFilter must be used within TimeFilterProvider");
  return ctx;
}
