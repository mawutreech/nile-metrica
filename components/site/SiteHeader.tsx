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
  href: string;
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
      className="h-4 w-4 text-[#3f7f68]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function HomeIcon({ className = "h-8 w-8 text-slate-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
    </svg>
  );
}

function SouthSudanIcon({ className = "h-8 w-8 text-slate-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function BusinessIcon({ className = "h-8 w-8 text-slate-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 19h16" />
      <path d="M6 15V9" />
      <path d="M10 15V5" />
      <path d="M14 15v-3" />
      <path d="M18 15V7" />
    </svg>
  );
}

function PoliticsIcon({ className = "h-8 w-8 text-slate-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20h16" />
      <path d="M6 20V8" />
      <path d="M6 8h11l-2 3 2 3H6" />
    </svg>
  );
}

function OpinionIcon({ className = "h-8 w-8 text-slate-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CultureSportIcon({ className = "h-8 w-8 text-slate-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M14 7h7" />
      <path d="M14 12h5" />
      <path d="M5 21l4-6 3 2 3-4 4 8" />
    </svg>
  );
}

const navGroups: NavGroup[] = [
  {
    label: "HOME",
    sublabel: "front page and highlights",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    label: "SOUTH SUDAN",
    sublabel: "country and national reference",
    href: "/country",
    icon: <SouthSudanIcon />,
    items: [
      { label: "Country Overview", href: "/country" },
      { label: "States & Territories", href: "/states" },
      { label: "Governance", href: "/governance" },
      { label: "Law & Constitution", href: "/law" },
      { label: "Society", href: "/society" },
      { label: "Environment", href: "/environment" },
      { label: "Census", href: "/census" },
    ],
  },
  {
    label: "BUSINESS",
    sublabel: "economy markets and data",
    href: "/economy",
    icon: <BusinessIcon />,
    items: [
      { label: "Economy", href: "/economy" },
      { label: "Data & Statistics", href: "/statistics" },
      { label: "Datasets", href: "/data" },
      { label: "Indicators", href: "/indicators" },
      { label: "Methodology", href: "/methodology" },
      { label: "Publications", href: "/publications" },
    ],
  },
  {
    label: "POLITICS",
    sublabel: "public affairs and power",
    href: "/politics",
    icon: <PoliticsIcon />,
    items: [
      { label: "Political System", href: "/politics" },
      { label: "Elections", href: "/politics" },
      { label: "Parties", href: "/politics" },
      { label: "Public Affairs", href: "/politics" },
    ],
  },
  {
    label: "OPINION",
    sublabel: "analysis and commentary",
    href: "/opinion",
    icon: <OpinionIcon />,
    items: [
      { label: "Editorials", href: "/opinion" },
      { label: "Commentary", href: "/opinion" },
      { label: "Analysis", href: "/opinion" },
      { label: "Essays", href: "/opinion" },
    ],
  },
  {
    label: "CULTURE & SPORT",
    sublabel: "heritage arts and games",
    href: "/culture-sport",
    icon: <CultureSportIcon />,
    items: [
      { label: "Culture", href: "/culture-sport" },
      { label: "Heritage", href: "/culture-sport" },
      { label: "Arts & Literature", href: "/culture-sport" },
      { label: "Sport", href: "/culture-sport" },
    ],
  },
];

function DesktopDropdown({
  open,
  items,
}: {
  open: boolean;
  items: MenuItem[];
}) {
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
          "absolute left-0 top-full z-50 mt-3 min-w-[300px] overflow-hidden rounded-none border border-[#d9d9d9] bg-white shadow-lg transition-all duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-1 pointer-events-none opacity-0",
        ].join(" ")}
      >
        {items.map((item, index) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={[
              "block px-5 py-3 text-sm text-[#444] transition hover:bg-[#f6f6f6] hover:text-[#2f6e57]",
              index !== 0 ? "border-t border-[#ececec]" : "",
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
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
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
      <div className="border-b border-[#dcdcdc]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3f7f68] text-sm font-bold text-white">
              NK
            </div>

            <div className="min-w-0">
              <p className="truncate text-[30px] font-light leading-none tracking-tight text-[#3f7f68] sm:text-[34px]">
                Nile <span className="text-[#5f5aa2]">Metrica</span>
              </p>
              <p className="mt-1 truncate text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:text-[11px]">
                South Sudan Knowledge Portal
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-4 lg:flex">
            <div>
              <p className="mb-1 text-sm text-[#444]">Search</p>
              <form action="/search" method="GET" className="flex items-center">
                <div className="flex items-center border border-[#d9d9d9] bg-[#f4f4f4] px-4 py-3">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search"
                    className="w-64 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500"
                  />
                  <SearchIcon />
                </div>
              </form>
            </div>

            <Link
              href="/admin"
              className="mt-6 bg-[#2f6e57] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285f4b]"
            >
              ADMIN
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/search"
              className="border border-[#d9d9d9] px-3 py-2 text-sm text-slate-700"
            >
              Search
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="border border-[#d9d9d9] px-3 py-2 text-sm text-slate-700"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-[#dcdcdc] bg-[#f3f3f3] xl:block">
        <div className="mx-auto grid max-w-7xl grid-cols-6">
          {navGroups.map((group) => {
            const isOpen = openMenu === group.label;

            return (
              <div
                key={group.label}
                className="relative border-r border-[#dcdcdc] last:border-r-0"
                onMouseEnter={() => group.items && openDropdown(group.label)}
                onMouseLeave={closeDropdownSoon}
              >
                <Link
                  href={group.href}
                  className={[
                    "group flex min-h-[132px] w-full flex-col items-center justify-center px-4 py-5 text-center transition",
                    isOpen ? "bg-white" : "hover:bg-white",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "mb-4 transition",
                      isOpen
                        ? "text-[#3f7f68]"
                        : "text-slate-500 group-hover:text-[#3f7f68]",
                    ].join(" ")}
                  >
                    {group.icon}
                  </div>
                  <p className="text-[14px] font-medium leading-5 text-[#333]">
                    {group.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#555]">
                    {group.sublabel}
                  </p>
                </Link>

                {group.items ? (
                  <DesktopDropdown open={isOpen} items={group.items} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={[
          "overflow-hidden bg-white transition-all duration-200 lg:hidden",
          mobileOpen
            ? "max-h-[100rem] border-b border-[#dcdcdc] opacity-100"
            : "max-h-0 border-b-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="space-y-4">
            <form
              action="/search"
              method="GET"
              className="border border-[#dcdcdc] bg-[#f5f5f5] p-4"
            >
              <label className="mb-2 block text-sm font-semibold text-[#555]">
                Search
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="q"
                  placeholder="Search"
                  className="w-full border border-[#d9d9d9] bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="border border-[#d9d9d9] px-4 py-3 text-sm font-medium text-slate-700"
                >
                  Go
                </button>
              </div>
            </form>

            {navGroups.map((group) => {
              const isExpanded = mobileSectionOpen === group.label;

              return (
                <div
                  key={group.label}
                  className="border border-[#dcdcdc] bg-[#f5f5f5]"
                >
                  <div className="flex items-center justify-between gap-3 p-4">
                    <Link
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-w-0 items-start gap-3"
                    >
                      <span className="mt-0.5 text-slate-500">{group.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#333]">
                          {group.label}
                        </p>
                        <p className="mt-1 text-sm text-[#555]">
                          {group.sublabel}
                        </p>
                      </div>
                    </Link>

                    {group.items ? (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSectionOpen((current) =>
                            current === group.label ? null : group.label
                          )
                        }
                        className="shrink-0 border border-[#d9d9d9] bg-white px-3 py-2 text-sm text-[#444]"
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${group.label} submenu`}
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    ) : null}
                  </div>

                  {group.items && isExpanded ? (
                    <div className="border-t border-[#dcdcdc] bg-white p-3">
                      <div className="space-y-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileSectionOpen(null);
                            }}
                            className="block border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#444]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block bg-[#2f6e57] px-4 py-3 text-center text-sm font-medium text-white"
            >
              ADMIN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}