import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function NewTradePage() {
  return (
    <PageLayout
      title="New Trade"
      subtitle="Form placeholder. Próximo: RHF + Zod + modal system (etapa seguinte)."
      right={<button className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/15">Save</button>}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Trade form (placeholder)</div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="rounded-xl bg-black/30 px-3 py-2">Asset</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Side / Size</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Entry / SL / TP</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Tags</div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Attachments</div>
          <p className="mt-2 text-sm text-zinc-300">Screenshots, links e meta (vai ligar à tabela Screenshot na etapa DB).</p>
          <div className="mt-3 rounded-xl border border-dashed border-white/15 bg-black/20 p-6 text-center text-xs text-zinc-400">
            Drop files here
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
