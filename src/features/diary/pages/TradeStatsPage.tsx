import React from "react";
import { useTimeFilter } from "../../../shared/timeFilters/TimeFilterContext";

export function TradeStatsPage() {
  const { rangeKey, range } = useTimeFilter();
  return (
    <div>
      <div>Trading Diary — Trade Stats (placeholder)</div>
      <div style={{ opacity: 0.7, marginTop: 8 }}>
        Active filter: {rangeKey} | {range.from} → {range.to}
      </div>
    </div>
  );
}

export default TradeStatsPage;

