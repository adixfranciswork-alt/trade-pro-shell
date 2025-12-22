import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function NewSetupPage() {
  return (
    <PageLayout
      title="New Setup"
      subtitle="Form placeholder. Próximo: ligação a reports + templates + tags."
      right={<button className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/15">Save</button>}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-semibold">Setup form (placeholder)</div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="rounded-xl bg-black/30 px-3 py-2 text-sm text-zinc-300">Setup name</div>
          <div className="rounded-xl bg-black/30 px-3 py-2 text-sm text-zinc-300">Timeframe</div>
          <div className="rounded-xl bg-black/30 px-3 py-2 text-sm text-zinc-300">Rules / checklist</div>
          <div className="rounded-xl bg-black/30 px-3 py-2 text-sm text-zinc-300">Tags</div>
        </div>
      </div>
    </PageLayout>
  );
}
