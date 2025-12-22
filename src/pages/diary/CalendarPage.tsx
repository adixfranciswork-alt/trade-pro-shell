import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function CalendarPage() {
  return (
    <PageLayout
      title="Calendar"
      subtitle="Aqui o Topbar NÃO mostra os filtros globais. O calendário tem a sua própria lógica."
      right={
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10">
            Today
          </button>
          <button className="rounded-xl bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10">
            Month
          </button>
        </div>
      }
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-semibold">Calendar placeholder</div>
        <p className="mt-2 text-sm text-zinc-300">
          Vamos reaproveitar a lógica da app traderpro-app-reshape (com melhorias). Aqui vais ter as views e interações do diário.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-zinc-300">
              Slot {i + 1} — evento / trade / report marker
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
