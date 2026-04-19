"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

type RegionGroup = {
  label: string;
  items: MenuItem[];
};

type NavGroup = {
  label: string;
  href: string;
  items?: MenuItem[];
  regions?: RegionGroup[];
};

const navGroups: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Business & Tech", href: "/economy" },
  { label: "Opinion", href: "/opinion" },
  { label: "Data & Statistics", href: "/data" },
  {
    label: "States & Territories",
    href: "/census",
    regions: [
      {
        label: "Greater Bahr el Ghazal",
        items: [
          {
            label: "Abyei Administrative Area",
            href: "/census/abyei-administrative-area",
          },
          { label: "Lakes", href: "/census/lakes" },
          {
            label: "Northern Bahr el Ghazal",
            href: "/census/northern-bahr-el-ghazal",
          },
          { label: "Warrap", href: "/census/warrap" },
          {
            label: "Western Bahr el Ghazal",
            href: "/census/western-bahr-el-ghazal",
          },
        ],
      },
      {
        label: "Greater Equatoria",
        items: [
          {
            label: "Central Equatoria",
            href: "/census/central-equatoria",
          },
          {
            label: "Eastern Equatoria",
            href: "/census/eastern-equatoria",
          },
          {
            label: "Western Equatoria",
            href: "/census/western-equatoria",
          },
        ],
      },
      {
        label: "Greater Upper Nile",
        items: [
          { label: "Jonglei", href: "/census/jonglei" },
          { label: "Unity", href: "/census/unity" },
          { label: "Upper Nile", href: "/census/upper-nile" },
          {
            label: "Greater Pibor Administrative Area",
            href: "/census/greater-pibor-administrative-area",
          },
          {
            label: "Ruweng Administrative Area",
            href: "/census/ruweng-administrative-area",
          },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function formatToday() {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(new Date())
    .toUpperCase();
}

function DesktopDropdown({
  open,
  items,
  regions,
}: {
  open: boolean;
  items?: MenuItem[];
  regions?: RegionGroup[];
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

  const hasRegions = regions && regions.length > 0;

  return (
    <>
      <div className="absolute left-0 top-full h-3 w-full" />
      <div
        className={[
          "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 overflow-hidden rounded-md border border-[#264f8a] bg-white shadow-xl transition-all duration-200",
          hasRegions ? "min-w-[620px]" : "min-w-[240px]",
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-1 pointer-events-none opacity-0",
        ].join(" ")}
      >
        {hasRegions ? (
          <div className="max-h-[34rem] overflow-y-auto p-4">
            <div className="grid gap-5 md:grid-cols-3">
              {regions.map((region) => (
                <div key={region.label}>
                  <div className="mb-2 border-b border-[#e4ecf7] pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f3b73]">
                    {region.label}
                  </div>
                  <div className="space-y-1">
                    {region.items.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        className="block rounded px-2 py-2 text-sm text-[#1f2937] transition hover:bg-[#f1f6fd] hover:text-[#0f3b73]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          items?.map((item, index) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={[
                "block px-5 py-3 text-sm text-[#1f2937] transition hover:bg-[#f1f6fd] hover:text-[#0f3b73]",
                index !== 0 ? "border-t border-[#e4ecf7]" : "",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))
        )}
      </div>
    </>
  );
}

function BrandMark() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white shadow-sm">
        <Image
          src="/nile-metrica-logo-replacement.jpg"
          alt="Nile Metrica logo"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div>
        <p className="text-[24px] font-light leading-none tracking-tight text-white">
          Nile <span className="text-[#c7c3ff]">Metrica</span>
        </p>
        <p className="mt-1.5 text-[9px] uppercase tracking-[0.22em] text-white/75">
          Calibrating the Nile Valley
        </p>
      </div>
    </Link>
  );
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(
    null
  );
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const today = formatToday();

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
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 180);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  return (
    <header className="bg-[#0f3b73] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="hidden w-[180px] text-[11px] uppercase tracking-[0.18em] text-white/75 md:block">
            {today}
          </div>

          <div className="hidden md:flex">
            <BrandMark />
          </div>

          <div className="hidden w-[280px] items-center justify-end gap-4 md:flex">
            <form action="/search" method="GET" className="w-44">
              <input
                type="text"
                name="q"
                placeholder="Search"
                autoComplete="off"
                className="w-full rounded-full border border-white/20 bg-white px-4 py-2 text-sm text-[#1f2937] outline-none placeholder:text-slate-400"
              />
            </form>

            <Link
              href="/login"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0f3b73] transition hover:bg-[#e8eef9]"
            >
              Sign in
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded border border-white/20 px-3 py-2 text-sm text-white"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:hidden">
        <div className="mb-4 text-center text-[11px] uppercase tracking-[0.18em] text-white/75">
          {today}
        </div>

        <div className="flex justify-center">
          <BrandMark />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href="/login"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0f3b73]"
          >
            Sign in
          </Link>

          <form action="/search" method="GET" className="w-[62%]">
            <input
              type="text"
              name="q"
              placeholder="Search"
              autoComplete="off"
              className="w-full rounded-full border border-white/20 bg-white px-4 py-2 text-sm text-[#1f2937] outline-none placeholder:text-slate-400"
            />
          </form>
        </div>
      </div>

      <div className="border-y border-white/10 bg-[#114685]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="hidden md:block">
            <div className="flex items-center justify-center gap-8 py-4">
              {navGroups.map((group) => {
                const isOpen = openMenu === group.label;

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() =>
                      (group.items || group.regions) && openDropdown(group.label)
                    }
                    onMouseLeave={closeDropdownSoon}
                  >
                    <Link
                      href={group.href}
                      className="text-[15px] font-medium text-white/95 transition hover:text-white"
                    >
                      {group.label}
                    </Link>

                    {group.items || group.regions ? (
                      <DesktopDropdown
                        open={isOpen}
                        items={group.items}
                        regions={group.regions}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden bg-[#0f3b73] transition-all duration-200 md:hidden",
          mobileOpen ? "max-h-[60rem] border-t border-white/10 py-4" : "max-h-0 py-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="space-y-3">
            {navGroups.map((group) => {
              const isExpanded = mobileSectionOpen === group.label;

              return (
                <div
                  key={group.label}
                  className="rounded border border-white/10 bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3 p-4">
                    <Link
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-white"
                    >
                      {group.label}
                    </Link>

                    {group.items || group.regions ? (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSectionOpen((current) =>
                            current === group.label ? null : group.label
                          )
                        }
                        className="rounded border border-white/20 px-3 py-1 text-sm text-white"
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    ) : null}
                  </div>

                  {isExpanded ? (
                    <div className="border-t border-white/10 bg-white/5 p-3">
                      {group.regions ? (
                        <div className="space-y-4">
                          {group.regions.map((region) => (
                            <div key={region.label}>
                              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                                {region.label}
                              </div>
                              <div className="space-y-2">
                                {region.items.map((item) => (
                                  <Link
                                    key={item.href + item.label}
                                    href={item.href}
                                    onClick={() => {
                                      setMobileOpen(false);
                                      setMobileSectionOpen(null);
                                    }}
                                    className="block px-3 py-2 text-sm text-white/90"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : group.items ? (
                        <div className="space-y-2">
                          {group.items.map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSectionOpen(null);
                              }}
                              className="block px-3 py-2 text-sm text-white/90"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}