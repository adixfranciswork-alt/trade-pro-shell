import React, { Fragment, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS, NavGroupKey } from "../routes";

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

const GROUP_LABEL: Record<NavGroupKey, string> = {
  REPORTS: "Reports",
  MACRO_INV: "Macro e Investimento",
  DIARY: "Trading Diary",
  SETTINGS: "Settings",
};

function Icon({ pathD }: { pathD: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={pathD} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return <Icon pathD="M6 6l12 12M18 6l-12 12" />;
}

export function Sidebar({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [railExpanded, setRailExpanded] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<NavGroupKey, typeof NAV_ITEMS>();
    for (const item of NAV_ITEMS) {
      const arr = map.get(item.group) ?? [];
      arr.push(item);
      map.set(item.group, arr);
    }
    return map;
  }, []);

  const isNewPage = pathname.startsWith("/new/");
  const isSettingsOrAccount = pathname.startsWith("/settings") || pathname.startsWith("/account");

  // Desktop/tablet: rail collapsed on md, full on lg.
  // Optional: allow rail expand toggle on md by click.
  const railWidth = railExpanded ? "w-[260px]" : "w-[76px]";

  const Brand = (
    <button
      onClick={() => navigate("/reports/asset")}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-white/5"
      title="Trade Pro"
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 shadow-soft">
        <span className="text-sm font-semibold">TP</span>
      </div>
      <div className={classNames("min-w-0", "hidden lg:block")}>
        <div className="truncate text-sm font-semibold">Trade Pro</div>
        <div className="truncate text-xs text-zinc-400">Reports • Diary • Macro</div>
      </div>
    </button>
  );

  const Nav = (
    <nav className="mt-4 space-y-5">
      {Array.from(grouped.entries()).map(([group, items]) => {
        const label = GROUP_LABEL[group];
        const showQuickCreateGroup = group === "DIARY";
        return (
          <div key={group}>
            <div className={classNames("px-3 text-[11px] uppercase tracking-wider text-zinc-500", "hidden lg:block")}>
              {label}
            </div>

            <div className="mt-2 space-y-1">
              {items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(
                      "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                      isActive ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    )
                  }
                  title={item.label}
                >
                  <span className="text-zinc-300 group-hover:text-white">{item.icon}</span>
                  <span className="hidden lg:block">{item.label}</span>
                </NavLink>
              ))}

              {/* Quick create buttons live under Trading Diary (desktop). */}
              {showQuickCreateGroup && (
                <div className={classNames("pt-3", "hidden lg:block")}>
                  <div className="px-3 text-[11px] uppercase tracking-wider text-zinc-500">Quick Create</div>
                  <div className="mt-2 space-y-1">
                    <NavLink
                      to="/new/trade"
                      className={({ isActive }) =>
                        classNames(
                          "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                          isActive ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        )
                      }
                    >
                      <span>New Trade</span>
                      <span className="text-xs text-zinc-500">T</span>
                    </NavLink>
                    <NavLink
                      to="/new/setup"
                      className={({ isActive }) =>
                        classNames(
                          "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                          isActive ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        )
                      }
                    >
                      <span>New Setup</span>
                      <span className="text-xs text-zinc-500">S</span>
                    </NavLink>
                    <NavLink
                      to="/new/note"
                      className={({ isActive }) =>
                        classNames(
                          "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                          isActive ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        )
                      }
                    >
                      <span>New Note</span>
                      <span className="text-xs text-zinc-500">N</span>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );

  const FooterHint = (
    <div className="mt-auto border-t border-white/5 px-3 py-3 text-xs text-zinc-500">
      <div className="hidden lg:block">
        Layout responsive ativo (sidebar + topbar + body).<br />
        Próximo passo: ligar filtros às queries.
      </div>
      <button
        type="button"
        className={classNames(
          "mt-2 hidden md:flex lg:hidden",
          "w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-[12px] text-zinc-300 hover:bg-white/10"
        )}
        onClick={() => setRailExpanded((v) => !v)}
      >
        <span>{railExpanded ? "Recolher" : "Expandir"}</span>
      </button>
    </div>
  );

  // Desktop + tablet sidebar
  const DesktopSidebar = (
    <aside
      className={classNames(
        "fixed inset-y-0 left-0 z-30 hidden md:flex",
        "border-r border-white/5 bg-zinc-950/80 backdrop-blur",
        "lg:w-[260px]",
        "md:flex-col",
        "md:" + railWidth
      )}
    >
      <div className="flex h-full flex-col px-2 py-3">
        {Brand}
        <div className={classNames("mt-2 hidden md:block lg:hidden px-2")}>
          <div className="rounded-xl bg-white/5 p-2 text-[11px] text-zinc-400">
            <div className={railExpanded ? "block" : "hidden"}>
              Dica: em tablet podes usar modo rail para ganhar espaço.
            </div>
            <div className={railExpanded ? "hidden" : "block"}>Modo rail.</div>
          </div>
        </div>
        {Nav}
        {FooterHint}
      </div>
    </aside>
  );

  // Mobile drawer
  const MobileDrawer = (
    <Fragment>
      <div
        className={classNames(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onCloseMobile}
      />
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 w-[82%] max-w-[320px] bg-zinc-950",
          "border-r border-white/10 shadow-soft transition-transform",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-full flex-col px-3 py-3">
          <div className="flex items-center justify-between">
            {Brand}
            <button
              className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 hover:bg-white/10"
              onClick={onCloseMobile}
              aria-label="Close navigation"
            >
              <CloseIcon />
            </button>
          </div>

          {/* In mobile, show quick create as primary buttons at top */}
          {!isSettingsOrAccount && !isNewPage && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              <NavLink
                to="/new/trade"
                onClick={onCloseMobile}
                className="rounded-xl bg-white/5 px-3 py-2 text-center text-xs text-zinc-200 hover:bg-white/10"
              >
                New Trade
              </NavLink>
              <NavLink
                to="/new/setup"
                onClick={onCloseMobile}
                className="rounded-xl bg-white/5 px-3 py-2 text-center text-xs text-zinc-200 hover:bg-white/10"
              >
                New Setup
              </NavLink>
              <NavLink
                to="/new/note"
                onClick={onCloseMobile}
                className="rounded-xl bg-white/5 px-3 py-2 text-center text-xs text-zinc-200 hover:bg-white/10"
              >
                New Note
              </NavLink>
            </div>
          )}

          <div className="mt-4 overflow-auto pr-1">{Nav}</div>
          {FooterHint}
        </div>
      </aside>
    </Fragment>
  );

  return (
    <>
      {DesktopSidebar}
      <div className="md:hidden">{MobileDrawer}</div>
    </>
  );
}
