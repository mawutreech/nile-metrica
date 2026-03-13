import Link from "next/link";

const exploreLinks = [
  { label: "Country", href: "/country" },
  { label: "Governance", href: "/governance" },
  { label: "Law & Constitution", href: "/law" },
  { label: "Economy", href: "/economy" },
  { label: "Society & Services", href: "/society" },
  { label: "Environment", href: "/environment" },
];

const geographyLinks = [
  { label: "States & Territories", href: "/states" },
  { label: "Census Explorer", href: "/census" },
  { label: "Administrative Areas", href: "/census" },
  { label: "County Profiles", href: "/census" },
];

const evidenceLinks = [
  { label: "Data & Statistics", href: "/statistics" },
  { label: "Datasets", href: "/data" },
  { label: "Indicators", href: "/indicators" },
  { label: "Publications", href: "/publications" },
  { label: "Methodology", href: "/methodology" },
];

const utilityLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Search", href: "/search" },
  { label: "Admin", href: "/admin" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                NK
              </div>
              <div>
                <p className="text-2xl font-light leading-none tracking-tight text-emerald-700">
                  Nile <span className="text-indigo-700">Metrika</span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  South Sudan Knowledge Portal
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Nile Metrika is a South Sudan knowledge portal bringing together
              governance, geography, law, public information, and data in one
              place.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Portal scope
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Built to improve access to structured national and subnational
                information across themes, institutions, places, and evidence.
              </p>
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Geography" links={geographyLinks} />
          <FooterColumn title="Evidence" links={evidenceLinks} />
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Quick access
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Move quickly across the main portal utilities and support pages.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {utilityLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Nile Metrika. South Sudan Knowledge Portal.</p>
          <p>Coverage and content structure will continue expanding over time.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-slate-700 transition hover:text-emerald-700"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}