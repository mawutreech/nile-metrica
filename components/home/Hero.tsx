import Link from "next/link";
import { Container } from "@/components/common/Container";

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              Public Statistics Portal
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              South Sudan&apos;s public data and statistics portal
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore trusted statistics on the economy, population, health, education,
              environment, and public services through structured data, publications, and dashboards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/data" className="nm-button-primary">
                Explore Data
              </Link>
              <Link href="/publications" className="nm-button-secondary">
                View Publications
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="nm-card p-5">
              <p className="text-sm text-slate-500">Population</p>
              <p className="mt-2 text-3xl font-semibold">12.4M</p>
              <p className="mt-1 text-sm text-slate-500">Estimated, 2025</p>
            </div>
            <div className="nm-card p-5">
              <p className="text-sm text-slate-500">Inflation</p>
              <p className="mt-2 text-3xl font-semibold">15.2%</p>
              <p className="mt-1 text-sm text-slate-500">Jan 2026</p>
            </div>
            <div className="nm-card p-5">
              <p className="text-sm text-slate-500">School Enrolment</p>
              <p className="mt-2 text-3xl font-semibold">58.1%</p>
              <p className="mt-1 text-sm text-slate-500">2025</p>
            </div>
            <div className="nm-card p-5">
              <p className="text-sm text-slate-500">Vaccination Coverage</p>
              <p className="mt-2 text-3xl font-semibold">64.3%</p>
              <p className="mt-1 text-sm text-slate-500">2025</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}