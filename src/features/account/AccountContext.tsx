import React, { createContext, useContext, useMemo, useState } from "react";
import type { AccountState, ActivePortofolio, Portofolio, User } from "./accountTypes";
import {
  createPortofolio,
  createUser,
  deletePortofolio,
  deleteUser,
  loadAccountState,
  setActivePortofolio,
  setActiveUser,
} from "./accountStorage";

type AccountContextValue = AccountState & {
  active: ActivePortofolio;
  refresh: () => void;

  actions: {
    createUser: (input: { user_name: string; password: string }) => void;
    deleteUser: (userId: number) => void;
    setActiveUser: (userId: number | null) => void;

    createPortofolio: (input: { user_id: number; portofolio_name: string; fiat: string; amount_create: number }) => void;
    deletePortofolio: (portofolioId: number) => void;
    setActivePortofolio: (portofolioId: number | null) => void;
  };
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccountState>(() => loadAccountState());

  const refresh = () => setState(loadAccountState());

  const usersById = useMemo(() => {
    const map = new Map<number, User>();
    for (const u of state.users) map.set(u.id, u);
    return map;
  }, [state.users]);

  const portofoliosById = useMemo(() => {
    const map = new Map<number, Portofolio>();
    for (const p of state.portofolios) map.set(p.id, p);
    return map;
  }, [state.portofolios]);

  const active = useMemo<ActivePortofolio>(() => {
    const user = state.activeUserId ? usersById.get(state.activeUserId) ?? null : null;
    const portofolio = state.activePortofolioId ? portofoliosById.get(state.activePortofolioId) ?? null : null;
    const fiat = portofolio?.fiat ?? null;
    return { user, portofolio, fiat };
  }, [state.activeUserId, state.activePortofolioId, usersById, portofoliosById]);

  const value: AccountContextValue = {
    ...state,
    active,
    refresh,
    actions: {
      createUser: (input) => {
        createUser(input);
        refresh();
      },
      deleteUser: (userId) => {
        deleteUser(userId);
        refresh();
      },
      setActiveUser: (userId) => {
        setActiveUser(userId);
        refresh();
      },
      createPortofolio: (input) => {
        createPortofolio(input);
        refresh();
      },
      deletePortofolio: (portofolioId) => {
        deletePortofolio(portofolioId);
        refresh();
      },
      setActivePortofolio: (portofolioId) => {
        setActivePortofolio(portofolioId);
        refresh();
      },
    },
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
