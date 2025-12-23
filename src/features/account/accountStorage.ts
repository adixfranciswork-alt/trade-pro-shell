import type { AccountState, Portofolio, User } from "./accountTypes";

const LS_USERS = "tp.users.v1";
const LS_PORTOFOLIOS = "tp.portofolios.v1";
const LS_ACTIVE_USER = "tp.activeUserId.v1";
const LS_ACTIVE_PORTOFOLIO = "tp.activePortofolioId.v1";

function nowISO() {
  return new Date().toISOString();
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readUsers(): User[] {
  return safeParse<User[]>(localStorage.getItem(LS_USERS), []);
}

function readPortofolios(): Portofolio[] {
  return safeParse<Portofolio[]>(localStorage.getItem(LS_PORTOFOLIOS), []);
}

function writeUsers(users: User[]) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function writePortofolios(portofolios: Portofolio[]) {
  localStorage.setItem(LS_PORTOFOLIOS, JSON.stringify(portofolios));
}

function readNumber(key: string): number | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function writeNumber(key: string, value: number | null) {
  if (value === null) localStorage.removeItem(key);
  else localStorage.setItem(key, String(value));
}

function nextId(items: Array<{ id: number }>) {
  return items.reduce((max, it) => Math.max(max, it.id), 0) + 1;
}

export function loadAccountState(): AccountState {
  const users = readUsers();
  const portofolios = readPortofolios();

  const activeUserId = readNumber(LS_ACTIVE_USER);
  const activePortofolioId = readNumber(LS_ACTIVE_PORTOFOLIO);

  const normalizedActiveUserId = activeUserId && users.some((u) => u.id === activeUserId) ? activeUserId : null;
  const normalizedActivePortofolioId =
    activePortofolioId && portofolios.some((p) => p.id === activePortofolioId) ? activePortofolioId : null;

  if (normalizedActiveUserId !== activeUserId) writeNumber(LS_ACTIVE_USER, normalizedActiveUserId);
  if (normalizedActivePortofolioId !== activePortofolioId) writeNumber(LS_ACTIVE_PORTOFOLIO, normalizedActivePortofolioId);

  return {
    users,
    portofolios,
    activeUserId: normalizedActiveUserId,
    activePortofolioId: normalizedActivePortofolioId,
  };
}

export function createUser(input: { user_name: string; password: string }): User {
  const users = readUsers();
  const created = nowISO();
  const user: User = {
    id: nextId(users),
    user_name: input.user_name.trim(),
    password: input.password,
    created,
    updated: created,
  };
  users.push(user);
  writeUsers(users);

  if (users.length === 1) writeNumber(LS_ACTIVE_USER, user.id);
  return user;
}

export function deleteUser(userId: number) {
  const users = readUsers().filter((u) => u.id !== userId);
  writeUsers(users);

  const portofolios = readPortofolios().filter((p) => p.user_id !== userId);
  writePortofolios(portofolios);

  const activeUserId = readNumber(LS_ACTIVE_USER);
  const activePortofolioId = readNumber(LS_ACTIVE_PORTOFOLIO);

  if (activeUserId === userId) writeNumber(LS_ACTIVE_USER, null);
  if (activePortofolioId && !portofolios.some((p) => p.id === activePortofolioId)) writeNumber(LS_ACTIVE_PORTOFOLIO, null);
}

export function setActiveUser(userId: number | null) {
  writeNumber(LS_ACTIVE_USER, userId);
  if (userId === null) {
    writeNumber(LS_ACTIVE_PORTOFOLIO, null);
  } else {
    const portofolios = readPortofolios();
    const activePortofolioId = readNumber(LS_ACTIVE_PORTOFOLIO);
    const ok = activePortofolioId ? portofolios.some((p) => p.id === activePortofolioId && p.user_id === userId) : false;
    if (!ok) writeNumber(LS_ACTIVE_PORTOFOLIO, null);
  }
}

export function createPortofolio(input: {
  user_id: number;
  portofolio_name: string;
  fiat: string;
  amount_create: number;
}): Portofolio {
  const portofolios = readPortofolios();
  const created = nowISO();

  const p: Portofolio = {
    id: nextId(portofolios),
    user_id: input.user_id,
    portofolio_name: input.portofolio_name.trim(),
    fiat: input.fiat.trim().toUpperCase(),
    amount_create: input.amount_create,
    amount_current: input.amount_create,
    created,
    updated: created,
  };

  portofolios.push(p);
  writePortofolios(portofolios);

  const activePortofolioId = readNumber(LS_ACTIVE_PORTOFOLIO);
  if (!activePortofolioId) writeNumber(LS_ACTIVE_PORTOFOLIO, p.id);

  return p;
}

export function deletePortofolio(portofolioId: number) {
  const portofolios = readPortofolios().filter((p) => p.id !== portofolioId);
  writePortofolios(portofolios);

  const activePortofolioId = readNumber(LS_ACTIVE_PORTOFOLIO);
  if (activePortofolioId === portofolioId) writeNumber(LS_ACTIVE_PORTOFOLIO, null);
}

export function setActivePortofolio(portofolioId: number | null) {
  writeNumber(LS_ACTIVE_PORTOFOLIO, portofolioId);
}

export function updatePortofolioCurrentAmount(portofolioId: number, amount_current: number) {
  const portofolios = readPortofolios();
  const idx = portofolios.findIndex((p) => p.id === portofolioId);
  if (idx === -1) return;
  portofolios[idx] = { ...portofolios[idx], amount_current, updated: nowISO() };
  writePortofolios(portofolios);
}
