import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTE_META } from "../routes";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { QuickCreateFab } from "./QuickCreateFab";

function getRouteTitle(pathname: string) {
  // Exact match first; fallback by prefix (future-proof for nested routes)
  if (ROUTE_META[pathname]?.title) return ROUTE_META[pathname].title;

  const key = Object.keys(ROUTE_META).find((k) => pathname.startsWith(k));
  if (key && ROUTE_META[key]?.title) return ROUTE_META[key].title;

  return "Trade Pro";
}

export function AppShell() {
  const { pathname } = useLocation();
  const title = useMemo(() => getRouteTitle(pathname), [pathname]);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const showFab =
    pathname.startsWith("/diary/") ||
    pathname.startsWith("/reports/") ||
    pathname.startsWith("/macro/");

  // ✅ Requisito Boss: ocultar filtros APENAS em Settings e Calendar
  const hideTimeFilters =
    pathname === "/settings" || pathname.startsWith("/diary/calendar");

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

      <div className="lg:pl-[260px]">
        <Topbar
          title={title}
          showTimeFilters={!hideTimeFilters}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />

        <main className="px-4 pb-20 pt-4 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {showFab && <QuickCreateFab />}
    </div>
  );
}
