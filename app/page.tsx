import Link from "next/link";

function CountryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function GovernanceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
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

function LawIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <path d="M12 3v18" />
      <path d="M7 7h10" />
      <path d="m7 7-3 5a2.5 2.5 0 0 0 5 0L7 7Z" />
      <path d="m17 7-3 5a2.5 2.5 0 0 0 5 0l-2-5Z" />
      <path d="M8 21h8" />
    </svg>
  );
}

function EconomyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
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

function SocietyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function EnvironmentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <path d="M6 21c6 0 12-6 12-14-8 0-14 6-14 12 0 1.1.9 2 2 2Z" />
      <path d="M10 14c1.5-1.5 4-3 8-4" />
    </svg>
  );
}

function TerritoriesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function PublicationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-emerald-700"
      aria-hidden="true"
    >
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
      <path d="M9 18h4" />
    </svg>
  );
}

const themeCards = [
  {
    title: "Country",
    description:
      "Start with South Sudan’s national overview, geography, population, and administrative structure.",
    href: "/country",
    icon: <CountryIcon />,
  },
  {
    title: "Governance",
    description:
      "Explore institutions, executive structures, decentralization, and public administration.",
    href: "/governance",
    icon: <GovernanceIcon />,
  },
  {
    title: "Law & Constitution",
    description:
      "Access constitutional, legal, and policy reference points that shape the state.",
    href: "/law",
    icon: <LawIcon />,
  },
  {
    title: "Economy",
    description:
      "Review macroeconomic structure, trade, public finance, agriculture, and productive sectors.",
    href: "/economy",
    icon: <EconomyIcon />,
  },
  {
    title: "Society & Services",
    description:
      "Browse education, health, social services, and wider human development themes.",
    href: "/society",
    icon: <SocietyIcon />,
  },
  {
    title: "Environment",
    description:
      "Explore land, climate, water, forestry, biodiversity, and environmental governance.",
    href: "/environment",
    icon: <EnvironmentIcon />,
  },
  {
    title: "States & Territories",
    description:
      "Move from the national level into states, administrative areas, counties, and local profiles.",
    href: "/states",
    icon: <TerritoriesIcon />,
  },
  {
    title: "Data & Statistics",
    description:
      "Access datasets, indicators, maps, census hierarchy, and structured statistical resources.",
    href: "/statistics",
    icon: <DataIcon />,
  },
  {
    title: "Publications",
    description:
      "Open reports, briefs, bulletins, and thematic knowledge outputs.",
    href: "/publications",
    icon: <PublicationIcon />,
  },
];

const featuredResources = [
  {
    title: "Census Overview",
    description:
      "Explore states, counties, and population through maps and tables.",
    href: "/census",
  },
  {
    title: "Datasets",
    description: "Browse downloadable datasets and linked metadata.",
    href: "/data",
  },
  {
    title: "Indicators",
    description:
      "Review measures, time series, and structured statistical definitions.",
    href: "/indicators",
  },
  {
    title: "Publications",
    description: "Access reports, bulletins, and national reference outputs.",
    href: "/publications",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs">
              South Sudan Knowledge Portal
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              South Sudan in one portal
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore governance, law, economy, geography, public services,
              states, territories, and data from one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/country"
                className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Explore the country
              </Link>
              <Link
                href="/states"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Browse states & territories
              </Link>
              <Link
                href="/statistics"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Open data & statistics
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
              Search
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Search the whole portal
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Search across national themes, geography, datasets, indicators,
              publications, and census pages.
            </p>
          </div>

          <form action="/search" method="GET" className="mt-6 max-w-3xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="q"
                placeholder="Search South Sudan knowledge and data..."
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
              Explore by theme
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Start with the part of South Sudan you want to understand.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Move from national themes to geography, then into detailed data,
              publications, and subnational profiles.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {themeCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-50 p-3">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {card.description}
                </p>
                <p className="mt-4 text-sm font-medium text-emerald-700">
                  Open section →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
                Explore by geography
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Move from the national level into states, territories, counties,
                payams, and bomas.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Use the geography explorer to browse South Sudan by place and
                understand how national information connects to subnational
                structures.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/states"
                  className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
                >
                  Explore states & territories
                </Link>
                <Link
                  href="/census"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-white"
                >
                  Open census explorer
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
                Featured national resources
              </p>
              <div className="mt-5 space-y-3">
                {featuredResources.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                  >
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 p-3">
              <DataIcon />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
                Data & statistics
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Structured evidence remains a core part of Nile Metrika.
              </h2>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Datasets, indicators, maps, census structures, and publications
            remain central to the portal, but now sit inside a wider national
            knowledge architecture.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/statistics"
              className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              Open data & statistics
            </Link>
            <Link
              href="/publications"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Browse publications
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

