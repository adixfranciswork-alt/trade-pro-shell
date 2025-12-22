import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function SettingsPage() {
  return (
    <PageLayout title="Settings" subtitle="Preferências, integridade da DB, export/import, etc.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">General</div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="rounded-xl bg-black/30 px-3 py-2">Theme (futuro)</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Timezone (futuro)</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Defaults (futuro)</div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Data</div>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <div className="rounded-xl bg-black/30 px-3 py-2">Export</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Import</div>
            <div className="rounded-xl bg-black/30 px-3 py-2">Maintenance</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
