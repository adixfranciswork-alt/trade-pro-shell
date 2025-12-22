import React, { useRef } from "react";
import { Link } from "react-router-dom";

import type { TimeRangeKey } from "../shared/timeFilters/timeFilterTypes";
import { useTimeFilter } from "../shared/timeFilters/TimeFilterContext";

type TopbarProps = {
  title: string;
  showTimeFilters: boolean;
  onOpenMobileNav: () => void;
};

const ROW_1: Array<{ label: string; key: TimeRangeKey }> = [
  { label: "Today", key: "TODAY" },
  { label: "Yesterday", key: "YESTERDAY" },
  { label: "This wk.", key: "THIS_WEEK" },
  { label: "Last wk.", key: "LAST_WEEK" },
  { label: "This mo.", key: "THIS_MONTH" },
];

const ROW_2: Array<{ label: string; key: TimeRangeKey }> = [
  { label: "Last mo.", key: "LAST_MONTH" },
  { label: "Last 3 mo.", key: "LAST_3_MONTHS" },
  { label: "This yr.", key: "THIS_YEAR" },
  { label: "Last yr.", key: "LAST_YEAR" },
];

const RESET_DEFAULT: TimeRangeKey = "THIS_MONTH";

export function Topbar({ title, showTimeFilters, onOpenMobileNav }: TopbarProps) {
  const { rangeKey, setRangeKey } = useTimeFilter();

  // UX: fechar dropdown ao clicar num item (evita ficar aberto)
  const accountDetailsRef = useRef<HTMLDetailsElement | null>(null);
  const closeAccountMenu = () => {
    accountDetailsRef.current?.removeAttribute("open");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur">
      <div className="flex items-start justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={onOpenMobileNav}
              className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-zinc-200 hover:bg-white/10 md:hidden"
              aria-label="Open navigation"
              title="Open navigation"
            >
              ☰
            </button>

            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-white">{title}</div>
              <div className="truncate text-xs text-zinc-400">Trade Pro</div>
            </div>
          </div>

          {/* Time Filters */}
          {showTimeFilters && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {ROW_1.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setRangeKey(b.key)}
                    className={[
                      "rounded-xl px-3 py-2 text-xs transition",
                      rangeKey === b.key
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-zinc-200 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {ROW_2.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setRangeKey(b.key)}
                    className={[
                      "rounded-xl px-3 py-2 text-xs transition",
                      rangeKey === b.key
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-zinc-200 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {b.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setRangeKey(RESET_DEFAULT)}
                  className="rounded-xl bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/10"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-zinc-200 hover:bg-white/10"
            aria-label="Notifications"
            title="Notifications"
          >
            🔔
          </button>

          <details ref={accountDetailsRef} className="relative">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-xl bg-white/5 text-zinc-200 hover:bg-white/10"
              aria-label="Account menu"
              title="Account"
            >
              👤
            </summary>

            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-zinc-950 p-2 shadow-soft">
              <Link
                to="/account"
                onClick={closeAccountMenu}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
              >
                Account
              </Link>
              <Link
                to="/settings"
                onClick={closeAccountMenu}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
              >
                Settings
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
