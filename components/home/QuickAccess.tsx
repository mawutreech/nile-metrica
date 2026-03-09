import Link from "next/link";
import {
  BarChart3,
  Database,
  BookOpen,
  FileBarChart,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/common/Container";

const items = [
  {
    href: "/data",
    title: "Explore Indicators",
    description: "Track key national statistics and headline measures.",
    icon: BarChart3,
    accent: "from-emerald-500/15 to-emerald-100",
  },
  {
    href: "/data",
    title: "Browse Datasets",
    description: "Find downloadable datasets and structured collections.",
    icon: Database,
    accent: "from-sky-500/15 to-sky-100",
  },
  {
    href: "/publications",
    title: "Read Publications",
    description: "Access reports, bulletins, and official releases.",
    icon: FileBarChart,
    accent: "from-amber-500/15 to-amber-100",
  },
  {
    href: "/methodology",
    title: "Methodology",
    description: "Definitions, classifications, and source notes.",
    icon: BookOpen,
    accent: "from-violet-500/15 to-violet-100",
  },
  {
    href: "/data",
    title: "Browse by Theme",
    description: "Navigate economy, health, education, and more.",
    icon: LayoutGrid,
    accent: "from-rose-500/15 to-rose-100",
  },
];

export function QuickAccess() {
  return (
    <section className="border-y border-slate-200 bg-white py-8">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Quick access
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Start where you need to
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Jump directly to indicators, datasets, publications, methodology,
            or theme-based navigation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`inline-flex rounded-2xl bg-gradient-to-br ${item.accent} p-3 text-slate-900`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <span>Open section</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}