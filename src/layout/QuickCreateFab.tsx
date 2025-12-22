import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function Icon({ pathD }: { pathD: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={pathD} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return <Icon pathD="M12 5v14M5 12h14" />;
}

export function QuickCreateFab() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-30 md:hidden">
      {open && (
        <div className="mb-3 w-48 space-y-2 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-soft">
          <button
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/10"
            onClick={() => {
              setOpen(false);
              navigate("/new/trade");
            }}
          >
            New Trade
          </button>
          <button
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/10"
            onClick={() => {
              setOpen(false);
              navigate("/new/setup");
            }}
          >
            New Setup
          </button>
          <button
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/10"
            onClick={() => {
              setOpen(false);
              navigate("/new/note");
            }}
          >
            New Note
          </button>
        </div>
      )}

      <button
        className={classNames(
          "grid h-14 w-14 place-items-center rounded-2xl",
          "bg-white/10 text-white shadow-soft ring-1 ring-white/10",
          "hover:bg-white/15 active:scale-[0.98] transition"
        )}
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick create"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
