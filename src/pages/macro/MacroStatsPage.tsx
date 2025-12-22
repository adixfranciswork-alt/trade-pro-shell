import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function MacroStatsPage() {
  return (
    <PageLayout
      title="Stats"
      subtitle="Estrutura pronta. Próximo: ligar queries, listas com filtros, e ações (arquivar/delete)."
      right={
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10">
            Action
          </button>
          <button className="rounded-xl bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10">
            Export
          </button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">O que esta página vai conter</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
            <li>Métricas agregadas macro/portfólio.</li><li>Comparações por período e correlações.</li><li>Filtros por período (Topbar).</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Estados obrigatórios</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
            <li>Loading / Error / Empty / No-results</li>
            <li>Filtros (search, status, tags)</li>
            <li>Ações por item: Arquivar / Delete</li>
            <li>Compatível com TimeFilter no Topbar quando aplicável</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
