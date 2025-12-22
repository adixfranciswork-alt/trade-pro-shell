import React from "react";

export type NavGroupKey = "REPORTS" | "MACRO_INV" | "DIARY" | "SETTINGS";

export type RouteMeta = {
  title: string;
  showTimeFilters: boolean;
};

export type NavItem = {
  group: NavGroupKey;
  label: string;
  path: string;
  icon: React.ReactNode;
};

export const ROUTE_META: Record<string, RouteMeta> = {
  "/reports/asset": { title: "Asset Report", showTimeFilters: true },
  "/reports/macro": { title: "Macro Report", showTimeFilters: true },

  "/macro/markets-analyses": { title: "Markets Analises", showTimeFilters: true },
  "/macro/stats": { title: "Stats", showTimeFilters: true },
  "/macro/investments": { title: "Investments", showTimeFilters: true },

  "/diary/dashboard": { title: "Dashboard", showTimeFilters: true },
  "/diary/trade-stats": { title: "Trade Stats", showTimeFilters: true },
  "/diary/calendar": { title: "Calendar", showTimeFilters: false },

  "/new/trade": { title: "New Trade", showTimeFilters: false },
  "/new/setup": { title: "New Setup", showTimeFilters: false },
  "/new/note": { title: "New Note", showTimeFilters: false },

  "/settings": { title: "Settings", showTimeFilters: false },
  "/account": { title: "Account", showTimeFilters: false },
};

// Tiny inline icons (no extra deps)
function Icon({ pathD }: { pathD: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={pathD} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const NAV_ITEMS: NavItem[] = [
  // Reports
  { group: "REPORTS", label: "Asset Report", path: "/reports/asset", icon: <Icon pathD="M4 5h16M4 12h10M4 19h16" /> },
  { group: "REPORTS", label: "Macro Report", path: "/reports/macro", icon: <Icon pathD="M4 19V5m0 14h16M8 17V9m4 8V7m4 10v-6" /> },

  // Macro & Investments
  { group: "MACRO_INV", label: "Markets Analises", path: "/macro/markets-analyses", icon: <Icon pathD="M4 19V5m16 14V5M8 15l3-3 2 2 3-4" /> },
  { group: "MACRO_INV", label: "Stats", path: "/macro/stats", icon: <Icon pathD="M7 20V10M12 20V4M17 20v-7" /> },
  { group: "MACRO_INV", label: "Investments", path: "/macro/investments", icon: <Icon pathD="M12 1v22M5 6h14M7 10h10M9 14h6M7 18h10" /> },

  // Diary
  { group: "DIARY", label: "Dashboard", path: "/diary/dashboard", icon: <Icon pathD="M4 4h7v7H4V4zm9 0h7v4h-7V4zM13 10h7v10h-7V10zM4 13h7v7H4v-7z" /> },
  { group: "DIARY", label: "Trade Stats", path: "/diary/trade-stats", icon: <Icon pathD="M4 18l6-6 4 4 6-10" /> },
  { group: "DIARY", label: "Calendar", path: "/diary/calendar", icon: <Icon pathD="M7 3v3m10-3v3M4 8h16M5 12h4m-4 4h4m6-4h4m-4 4h4M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" /> },

  // Settings
  { group: "SETTINGS", label: "Settings", path: "/settings", icon: <Icon pathD="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.6 2.8- .1-.1a1.8 1.8 0 0 0-2 .2 7.7 7.7 0 0 1-1.7 1 1.7 1.7 0 0 0-1.1 1.6V23H10v-.4a1.7 1.7 0 0 0-1.1-1.6 7.7 7.7 0 0 1-1.7-1 1.8 1.8 0 0 0-2-.2l-.1.1L3.5 17l.1-.1A1.7 1.7 0 0 0 4 15a7.8 7.8 0 0 1 0-2 1.7 1.7 0 0 0-.3-1.9l-.1-.1L5.2 8.2l.1.1a1.8 1.8 0 0 0 2-.2 7.7 7.7 0 0 1 1.7-1A1.7 1.7 0 0 0 10 5.5V5h4v.4a1.7 1.7 0 0 0 1.1 1.6 7.7 7.7 0 0 1 1.7 1 1.8 1.8 0 0 0 2 .2l.1-.1L20.5 11l-.1.1A1.7 1.7 0 0 0 20 13a7.8 7.8 0 0 1 0 2z" /> },
];
