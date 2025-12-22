import type { TimeRange, TimeRangeKey } from "./timeFilterTypes";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

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

// Semana ISO (2ª feira como início)
function startOfWeekMonday(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay(); // 0=Dom ... 6=Sáb
  const diff = (day + 6) % 7; // 2ª=0 ... Dom=6
  x.setDate(x.getDate() - diff);
  return x;
}

function endOfWeekSunday(d: Date) {
  const start = startOfWeekMonday(d);
  const x = new Date(start);
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

function addMonths(d: Date, months: number) {
  const x = new Date(d);
  const day = x.getDate();
  x.setMonth(x.getMonth() + months);
  // Ajuste para meses com menos dias
  if (x.getDate() !== day) x.setDate(0);
  return x;
}

export function computeTimeRange(key: TimeRangeKey, now = new Date()): TimeRange {
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  switch (key) {
    case "TODAY":
      return { from: toISODate(todayStart), to: toISODate(todayEnd) };

    case "YESTERDAY": {
      const y = new Date(todayStart);
      y.setDate(y.getDate() - 1);
      return { from: toISODate(y), to: toISODate(y) };
    }

    case "THIS_WEEK":
      return { from: toISODate(startOfWeekMonday(now)), to: toISODate(endOfWeekSunday(now)) };

    case "LAST_WEEK": {
      const lastWeekAnchor = new Date(now);
      lastWeekAnchor.setDate(lastWeekAnchor.getDate() - 7);
      return {
        from: toISODate(startOfWeekMonday(lastWeekAnchor)),
        to: toISODate(endOfWeekSunday(lastWeekAnchor)),
      };
    }

    case "THIS_MONTH":
      return { from: toISODate(startOfMonth(now)), to: toISODate(endOfMonth(now)) };

    case "LAST_MONTH": {
      const prev = addMonths(now, -1);
      return { from: toISODate(startOfMonth(prev)), to: toISODate(endOfMonth(prev)) };
    }

    // Rolling 3 meses até hoje (bom para stats)
    case "LAST_3_MONTHS": {
      const from = startOfDay(addMonths(now, -3));
      return { from: toISODate(from), to: toISODate(todayEnd) };
    }

    case "THIS_YEAR":
      return { from: toISODate(startOfYear(now)), to: toISODate(endOfYear(now)) };

    case "LAST_YEAR": {
      const prev = new Date(now);
      prev.setFullYear(prev.getFullYear() - 1);
      return { from: toISODate(startOfYear(prev)), to: toISODate(endOfYear(prev)) };
    }

    default:
      return { from: toISODate(todayStart), to: toISODate(todayEnd) };
  }
}
