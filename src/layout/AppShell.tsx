import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTE_META } from "../routes";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { QuickCreateFab } from "./QuickCreateFab";

function getRouteMeta(pathname: string) {
  // Exact match first; fallback by prefix (future-proof for nested routes)
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  const key = Object.keys(ROUTE_META).find((k) => pathname.startsWith(k));
  return key ? ROUTE_META[key] : { title: "Trade Pro", showTimeFilters: false };
}

export function AppShell() {
  const { pathname } = useLocation();
  const meta = useMemo(() => getRouteMeta(pathname), [pathname]);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const showFab =
    pathname.startsWith("/diary/") ||
    pathname.startsWith("/reports/") ||
    pathname.startsWith("/macro/");

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

      <div className="lg:pl-[260px]">
        <Topbar
          title={meta.title}
          showTimeFilters={meta.showTimeFilters}
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
