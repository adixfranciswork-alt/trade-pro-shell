import React from "react";
import { useLocation } from "react-router-dom";
import { ROUTE_META } from "../routes";
import { useTimeFilter } from "../context/TimeFilterContext";

function getTitle(pathname: string) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname].title;
  const key = Object.keys(ROUTE_META).find((k) => pathname.startsWith(k));
  return key ? ROUTE_META[key].title : "Trade Pro";
}

export function PageLayout({
  title,
  subtitle,
  children,
  right,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const { preset, range } = useTimeFilter();

  const resolvedTitle = title ?? getTitle(pathname);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-lg font-semibold">{resolvedTitle}</div>
          <div className="mt-1 text-sm text-zinc-400">{subtitle ?? "Placeholder — vamos ligar dados na etapa seguinte."}</div>
          <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-xl bg-black/30 px-3 py-2 text-xs text-zinc-300">
            <span className="font-medium">Time preset:</span>
            <span className="rounded-lg bg-white/5 px-2 py-1">{preset}</span>
            <span className="text-zinc-500">|</span>
            <span className="font-medium">Range:</span>
            <span className="text-zinc-400">{range.startISO ?? "—"}</span>
            <span className="text-zinc-500">→</span>
            <span className="text-zinc-400">{range.endISO ?? "—"}</span>
          </div>
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4 md:p-6">{children}</div>
    </div>
  );
}
