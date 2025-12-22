import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function NewNotePage() {
  return (
    <PageLayout
      title="New Note"
      subtitle="Form placeholder. Próximo: Rich text + links a trades/setups/reports."
      right={<button className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/15">Save</button>}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-semibold">Note editor (placeholder)</div>
        <div className="mt-3 h-40 rounded-xl bg-black/30 p-3 text-sm text-zinc-300">
          Escreve aqui…
        </div>
      </div>
    </PageLayout>
  );
}
