import React from "react";
import { PageLayout } from "../../layout/PageLayout";

export function AccountPage() {
  return (
    <PageLayout title="Account" subtitle="Perfil, preferências, e autenticação (se aplicável).">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-semibold">Account placeholder</div>
        <p className="mt-2 text-sm text-zinc-300">
          Aqui vais ter dados do utilizador e, se decidirmos, autenticação.
        </p>
      </div>
    </PageLayout>
  );
}
