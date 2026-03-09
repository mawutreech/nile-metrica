import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { getHeroStats } from "@/lib/queries";

export async function Hero() {
  const stats = await getHeroStats();

  return (
    <section className="bg-gradient-to-b from-emerald-50 via-white to-white py-20">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Public Statistics Portal
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              South Sudan’s public data and statistics portal
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore trusted statistics on the economy, population, health,
              education, environment, and public services through structured
              data, publications, and dashboards.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/data"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Explore Data
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/publications"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
              >
                View Publications
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-slate-700" />
                </div>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{stat.period}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}