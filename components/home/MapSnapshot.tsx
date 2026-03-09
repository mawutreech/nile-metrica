import Link from "next/link";
import { MapPinned, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";

const stateHighlights = [
  { name: "Central Equatoria", note: "Administrative and population hub" },
  { name: "Jonglei", note: "Large area with major demographic importance" },
  { name: "Upper Nile", note: "Key regional and economic significance" },
  { name: "Warrap", note: "Important population and service delivery trends" },
];

export function MapSnapshot() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Geographic snapshot
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Explore South Sudan through regional data
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Browse national and subnational statistics through geography-aware
            views, with future support for state and county comparisons.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <MapPinned className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  National map view
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Interactive state and county mapping can be added here next.
                </p>
              </div>
            </div>

            <div className="mt-8 flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-emerald-50 to-slate-50 p-8">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <MapPinned className="h-8 w-8 text-emerald-700" />
                </div>
                <h4 className="mt-5 text-lg font-semibold text-slate-900">
                  South Sudan map module
                </h4>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                  This section is reserved for a future interactive map showing
                  state-level and county-level indicators such as population,
                  health access, education, and service delivery.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/data"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Explore geographic data
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  State highlights
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  A simple regional snapshot area that can later be powered by
                  real state-level indicators from Supabase.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {stateHighlights.map((state, index) => (
                <div
                  key={state.name}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900 shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {state.name}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {state.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/data"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
              >
                View more regional data
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}