import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import type { TimeRangeKey } from "../shared/timeFilters/timeFilterTypes";

import { AppShell } from "../layout/AppShell";

import AssetReportPage from "../features/reports/pages/AssetReportPage";
import MacroReportPage from "../features/reports/pages/MacroReportPage";

import MarketsAnalisesPage from "../features/macro/pages/MarketsAnalysesPage";
import MacroStatsPage from "../features/macro/pages/MacroStatsPage";
import InvestmentsPage from "../features/macro/pages/InvestmentsPage";

import DashboardPage from "../features/diary/pages/DashboardPage";
import TradeStatsPage from "../features/diary/pages/TradeStatsPage";
import CalendarPage from "../features/diary/pages/CalendarPage";

import SettingsPage from "../features/settings/pages/SettingsPage";
import AccountPage from "../features/account/pages/AccountPage";

import NotFoundPage from "../features/system/pages/NotFoundPage";

function withTimeFilters(defaultKey: TimeRangeKey) {
  return { timeFilters: { enabled: true, defaultKey } };
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/reports/asset" replace /> },

      // Reports (filters ON)
      { path: "reports/asset", element: <AssetReportPage />, handle: withTimeFilters("THIS_MONTH") },
      { path: "reports/macro", element: <MacroReportPage />, handle: withTimeFilters("THIS_MONTH") },

      // Macro & Investimento (filters ON)
      { path: "macro/markets-analises", element: <MarketsAnalisesPage />, handle: withTimeFilters("THIS_MONTH") },
      { path: "macro/stats", element: <MacroStatsPage />, handle: withTimeFilters("THIS_MONTH") },
      { path: "macro/investments", element: <InvestmentsPage />, handle: withTimeFilters("THIS_MONTH") },

      // Trading Diary (filters ON)
      { path: "diary/dashboard", element: <DashboardPage />, handle: withTimeFilters("THIS_WEEK") },
      { path: "diary/trade-stats", element: <TradeStatsPage />, handle: withTimeFilters("LAST_3_MONTHS") },

      // Calendar (filters OFF) ✅ requisito
      { path: "diary/calendar", element: <CalendarPage />, handle: { timeFilters: { enabled: false } } },

      // Quick create (filters OFF)
      { path: "diary/new-trade", element: <div>New Trade (placeholder)</div>, handle: { timeFilters: { enabled: false } } },
      { path: "diary/new-setup", element: <div>New Setup (placeholder)</div>, handle: { timeFilters: { enabled: false } } },
      { path: "diary/new-note", element: <div>New Note (placeholder)</div>, handle: { timeFilters: { enabled: false } } },

      // Account (filters OFF)
      { path: "account", element: <AccountPage />, handle: { timeFilters: { enabled: false } } },

      // Settings (filters OFF) ✅ requisito
      { path: "settings", element: <SettingsPage />, handle: { timeFilters: { enabled: false } } },

      { path: "*", element: <NotFoundPage />, handle: { timeFilters: { enabled: false } } },
    ],
  },
]);
