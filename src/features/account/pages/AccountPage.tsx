import React from "react";
import { useAccount } from "../AccountContext";

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
}

export function AccountPage() {
  const { users, portofolios, activeUserId, activePortofolioId, active, actions } = useAccount();

  const [newUserName, setNewUserName] = React.useState("");
  const [newUserPassword, setNewUserPassword] = React.useState("");

  const [pfName, setPfName] = React.useState("");
  const [pfFiat, setPfFiat] = React.useState("EUR");
  const [pfAmount, setPfAmount] = React.useState("1000");

  const userPortofolios = React.useMemo(() => {
    if (!activeUserId) return [];
    return portofolios.filter((p) => p.user_id === activeUserId);
  }, [portofolios, activeUserId]);

  const canCreateUser = newUserName.trim().length >= 2 && newUserPassword.length >= 4;
  const canCreatePortofolio =
    !!activeUserId &&
    pfName.trim().length >= 2 &&
    pfFiat.trim().length >= 2 &&
    Number.isFinite(Number(pfAmount)) &&
    Number(pfAmount) > 0;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-white">Account</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Gestão de utilizadores e portofólios. O portofólio ativo define a moeda base (fiat) para o Trading Diary.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* LEFT: Users */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div>
            <div className="text-sm font-semibold text-white">Users</div>
            <div className="text-xs text-zinc-400">Seleciona um utilizador para gerir portofólios.</div>
          </div>

          <div className="mt-3 space-y-2">
            {users.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-zinc-950/30 p-3 text-sm text-zinc-300">
                Nenhum utilizador criado.
              </div>
            ) : (
              users.map((u) => (
                <div
                  key={u.id}
                  className={classNames(
                    "flex items-center justify-between rounded-xl border p-3",
                    activeUserId === u.id ? "border-white/20 bg-white/10" : "border-white/10 bg-zinc-950/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => actions.setActiveUser(u.id)}
                    className="min-w-0 text-left"
                    title="Set active user"
                  >
                    <div className="truncate text-sm font-medium text-white">{u.user_name}</div>
                    <div className="mt-1 text-xs text-zinc-400">id: {u.id}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const ok = confirm(`Eliminar user “${u.user_name}”? Isto remove também os portofólios.`);
                      if (ok) actions.deleteUser(u.id);
                    }}
                    className="rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10"
                    title="Delete user"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/30 p-3">
            <div className="text-sm font-semibold text-white">Create user</div>
            <div className="mt-3 grid gap-2">
              <input
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="user_name"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-white/20"
              />
              <input
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                placeholder="password (min 4 chars)"
                type="password"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-white/20"
              />
              <button
                type="button"
                disabled={!canCreateUser}
                onClick={() => {
                  actions.createUser({ user_name: newUserName, password: newUserPassword });
                  setNewUserName("");
                  setNewUserPassword("");
                }}
                className={classNames(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  canCreateUser ? "bg-white/10 text-white hover:bg-white/15" : "bg-white/5 text-zinc-500"
                )}
              >
                Create User
              </button>
              <div className="text-xs text-zinc-500">
                Nota: password está guardada localmente (modo dev). Quando ligares autenticação real, isto muda.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Portofolios */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">Portofolios</div>
              <div className="text-xs text-zinc-400">Um user pode ter vários portofólios. Um portofólio pertence a 1 user.</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-950/30 px-3 py-2 text-xs text-zinc-300">
              <div>
                Active fiat: <span className="font-semibold text-white">{active.fiat ?? "—"}</span>
              </div>
              <div className="mt-1">
                Active portfolio:{" "}
                <span className="font-semibold text-white">{active.portofolio?.portofolio_name ?? "—"}</span>
              </div>
            </div>
          </div>

          {!activeUserId ? (
            <div className="mt-3 rounded-xl border border-white/10 bg-zinc-950/30 p-3 text-sm text-zinc-300">
              Seleciona um user para veres e criares portofólios.
            </div>
          ) : (
            <>
              <div className="mt-3 space-y-2">
                {userPortofolios.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-zinc-950/30 p-3 text-sm text-zinc-300">
                    Este user ainda não tem portofólios.
                  </div>
                ) : (
                  userPortofolios.map((p) => (
                    <div
                      key={p.id}
                      className={classNames(
                        "flex items-center justify-between rounded-xl border p-3",
                        activePortofolioId === p.id ? "border-white/20 bg-white/10" : "border-white/10 bg-zinc-950/30"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => actions.setActivePortofolio(p.id)}
                        className="min-w-0 text-left"
                        title="Set active portofolio"
                      >
                        <div className="truncate text-sm font-medium text-white">{p.portofolio_name}</div>
                        <div className="mt-1 text-xs text-zinc-400">
                          {p.fiat} • created {formatMoney(p.amount_create)} • current {formatMoney(p.amount_current)}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const ok = confirm(`Eliminar portofólio “${p.portofolio_name}”?`);
                          if (ok) actions.deletePortofolio(p.id);
                        }}
                        className="rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:bg-white/10"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/30 p-3">
                <div className="text-sm font-semibold text-white">Create portofolio</div>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  <input
                    value={pfName}
                    onChange={(e) => setPfName(e.target.value)}
                    placeholder="portofolio_name"
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-white/20"
                  />
                  <input
                    value={pfFiat}
                    onChange={(e) => setPfFiat(e.target.value)}
                    placeholder="fiat (EUR, USD...)"
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-white/20"
                  />
                  <input
                    value={pfAmount}
                    onChange={(e) => setPfAmount(e.target.value)}
                    placeholder="amount_create"
                    inputMode="decimal"
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-white/20"
                  />
                </div>

                <button
                  type="button"
                  disabled={!canCreatePortofolio}
                  onClick={() => {
                    actions.createPortofolio({
                      user_id: activeUserId,
                      portofolio_name: pfName,
                      fiat: pfFiat,
                      amount_create: Number(pfAmount),
                    });
                    setPfName("");
                  }}
                  className={classNames(
                    "mt-3 w-full rounded-xl px-3 py-2 text-sm font-medium transition",
                    canCreatePortofolio ? "bg-white/10 text-white hover:bg-white/15" : "bg-white/5 text-zinc-500"
                  )}
                >
                  Create Portofolio
                </button>

                <div className="mt-2 text-xs text-zinc-500">
                  amount_current inicia com amount_create. Atualização automática por trades fechados fica para a próxima etapa.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
