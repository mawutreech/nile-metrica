"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

type NavGroup = {
  label: string;
  sublabel: string;
  href?: string;
  items?: MenuItem[];
  icon: React.ReactNode;
};

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-emerald-700"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function GlobeIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function GovernmentIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 10h18" />
      <path d="M5 10v8" />
      <path d="M9 10v8" />
      <path d="M15 10v8" />
      <path d="M19 10v8" />
      <path d="M2 18h20" />
      <path d="M12 4 3 8h18l-9-4Z" />
    </svg>
  );
}

function LawIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M7 7h10" />
      <path d="m7 7-3 5a2.5 2.5 0 0 0 5 0L7 7Z" />
      <path d="m17 7-3 5a2.5 2.5 0 0 0 5 0l-2-5Z" />
      <path d="M8 21h8" />
    </svg>
  );
}

function EconomyIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 19h16" />
      <path d="M6 15V9" />
      <path d="M10 15V5" />
      <path d="M14 15v-3" />
      <path d="M18 15V7" />
    </svg>
  );
}

function SocietyIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function EnvironmentIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 21c6 0 12-6 12-14-8 0-14 6-14 12 0 1.1.9 2 2 2Z" />
      <path d="M10 14c1.5-1.5 4-3 8-4" />
    </svg>
  );
}

function MapIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </svg>
  );
}

function DataIcon({ className = "h-7 w-7 text-emerald-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function PublicationIcon({ className = "h-7 w-7 text-slate-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
      <path d="M9 18h4" />
    </svg>
  );
}

const navGroups: NavGroup[] = [
  {
    label: "COUNTRY",
    sublabel: "overview and geography",
    icon: <GlobeIcon />,
    items: [
      { label: "Overview", href: "/country" },
      { label: "Geography", href: "/country" },
      { label: "History", href: "/country" },
      { label: "Population", href: "/census" },
      { label: "Administrative Structure", href: "/states" },
    ],
  },
  {
    label: "GOVERNANCE",
    sublabel: "institutions and public system",
    icon: <GovernmentIcon />,
    items: [
      { label: "Overview", href: "/governance" },
      { label: "Executive", href: "/governance" },
      { label: "Legislature", href: "/governance" },
      { label: "Judiciary", href: "/governance" },
      { label: "Local Government", href: "/states" },
    ],
  },
  {
    label: "LAW",
    sublabel: "constitution and policy",
    icon: <LawIcon />,
    items: [
      { label: "Overview", href: "/law" },
      { label: "Constitution", href: "/law" },
      { label: "Laws", href: "/law" },
      { label: "Regulations", href: "/law" },
      { label: "Policy Frameworks", href: "/law" },
    ],
  },
  {
    label: "ECONOMY",
    sublabel: "markets and public finance",
    icon: <EconomyIcon />,
    items: [
      { label: "Overview", href: "/economy" },
      { label: "Macroeconomy", href: "/economy" },
      { label: "Public Finance", href: "/economy" },
      { label: "Trade", href: "/economy" },
      { label: "Agriculture", href: "/economy" },
    ],
  },
  {
    label: "SOCIETY",
    sublabel: "services and human development",
    icon: <SocietyIcon />,
    items: [
      { label: "Overview", href: "/society" },
      { label: "Education", href: "/society" },
      { label: "Health", href: "/society" },
      { label: "Water & Sanitation", href: "/society" },
      { label: "Social Protection", href: "/society" },
    ],
  },
  {
    label: "ENVIRONMENT",
    sublabel: "land, climate and resources",
    icon: <EnvironmentIcon />,
    items: [
      { label: "Overview", href: "/environment" },
      { label: "Climate", href: "/environment" },
      { label: "Land", href: "/environment" },
      { label: "Water Resources", href: "/environment" },
      { label: "Disaster Risk", href: "/environment" },
    ],
  },
  {
    label: "STATES",
    sublabel: "territories and local geography",
    icon: <MapIcon />,
    items: [
      { label: "Overview", href: "/states" },
      { label: "All States", href: "/states" },
      { label: "Administrative Areas", href: "/states" },
      { label: "Census Explorer", href: "/census" },
      { label: "County Profiles", href: "/census" },
    ],
  },
  {
    label: "DATA & STATS",
    sublabel: "datasets and indicators",
    icon: <DataIcon />,
    items: [
      { label: "Overview", href: "/statistics" },
      { label: "Datasets", href: "/data" },
      { label: "Indicators", href: "/indicators" },
      { label: "Census", href: "/census" },
      { label: "Methodology", href: "/methodology" },
      { label: "Publications", href: "/publications" },
    ],
  },
  {
    label: "PUBLICATIONS",
    sublabel: "reports and briefs",
    icon: <PublicationIcon />,
    href: "/publications",
  },
];

function DesktopDropdown({ open, items }: { open: boolean; items: MenuItem[] }) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const timer = setTimeout(() => setMounted(false), 180);
    return () => clearTimeout(timer);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <div className="absolute left-0 top-full h-3 w-full" />
      <div
        className={[
          "absolute left-0 top-full z-50 mt-3 min-w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-200",
          open ? "translate-y-0 opacity-100" : "-translate-y-1 pointer-events-none opacity-0",
        ].join(" ")}
      >
        {items.map((item, index) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={[
              "block px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-emerald-700",
              index !== 0 ? "border-t border-slate-100" : "",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDropdown = (label: string) => {
    clearCloseTimer();
    setOpenMenu(label);
  };

  const closeDropdownSoon = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 220);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:py-5">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
              NK
            </div>

            <div className="min-w-0">
              <p className="truncate text-[30px] font-light leading-none tracking-tight text-emerald-700 sm:text-[34px]">
                Nile <span className="text-indigo-700">Metrika</span>
              </p>
              <p className="mt-1 truncate text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:text-[11px]">
                South Sudan Knowledge Portal
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <form action="/search" method="GET" className="flex items-center">
              <div className="flex items-center rounded-md bg-slate-100 px-4 py-3 shadow-sm">
                <input
                  type="text"
                  name="q"
                  placeholder="Search the portal"
                  className="w-64 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500"
                />
                <SearchIcon />
              </div>
            </form>

            <Link
              href="/admin"
              className="rounded-md bg-emerald-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/search"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
            >
              Search
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-slate-200 bg-white xl:block">
        <div className="mx-auto grid max-w-7xl grid-cols-9">
          {navGroups.map((group) => {
            const isOpen = openMenu === group.label;

            if (group.href) {
              return (
                <Link
                  key={group.label}
                  href={group.href}
                  className="flex min-h-[118px] flex-col items-center justify-center border-r border-slate-200 px-4 py-5 text-center transition last:border-r-0 hover:bg-slate-50"
                >
                  <div className="mb-3">{group.icon}</div>
                  <p className="text-[13px] font-medium tracking-[0.06em] text-slate-800">
                    {group.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-600">
                    {group.sublabel}
                  </p>
                </Link>
              );
            }

            return (
              <div
                key={group.label}
                className="relative border-r border-slate-200 last:border-r-0"
                onMouseEnter={() => openDropdown(group.label)}
                onMouseLeave={closeDropdownSoon}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((current) => (current === group.label ? null : group.label))
                  }
                  className={[
                    "flex min-h-[118px] w-full flex-col items-center justify-center px-4 py-5 text-center transition",
                    isOpen ? "bg-slate-50" : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="mb-3">{group.icon}</div>
                  <p className="text-[13px] font-medium tracking-[0.06em] text-slate-800">
                    {group.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-600">
                    {group.sublabel}
                  </p>
                </button>

                <DesktopDropdown open={isOpen} items={group.items || []} />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={[
          "overflow-hidden bg-white transition-all duration-200 lg:hidden",
          mobileOpen ? "max-h-[100rem] border-b border-slate-200 opacity-100" : "max-h-0 border-b-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="space-y-4">
            <form
              action="/search"
              method="GET"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Search
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="q"
                  placeholder="Search the portal"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  Go
                </button>
              </div>
            </form>

            {navGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-slate-500">{group.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{group.label}</p>
                      <p className="mt-1 text-sm text-slate-600">{group.sublabel}</p>
                    </div>
                  </div>

                  {group.href ? (
                    <Link
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-emerald-700"
                    >
                      Open
                    </Link>
                  ) : null}
                </div>

                {group.items ? (
                  <div className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}