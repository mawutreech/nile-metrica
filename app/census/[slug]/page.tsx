import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PublicPageIntro } from "@/components/site/PublicPageIntro";
import { CensusChildMap } from "@/components/census/CensusChildMap";

function childLabel(type: string | null) {
  switch (type) {
    case "state":
    case "administrative_area":
      return "Counties";
    case "county":
      return "Payams";
    case "payam":
      return "Bomas";
    default:
      return "Sub-units";
  }
}

function unitTypeLabel(type: string | null) {
  switch (type) {
    case "state":
      return "State";
    case "administrative_area":
      return "Administrative area";
    case "county":
      return "County";
    case "payam":
      return "Payam";
    case "boma":
      return "Boma";
    default:
      return "Geographic unit";
  }
}

function formatPopulation(value: number | null) {
  if (value === null || Number.isNaN(value)) return null;
  return new Intl.NumberFormat("en-US").format(value);
}

export default async function CensusUnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: unit, error: unitError } = await supabase
    .from("geographic_units")
    .select("id, name, slug, type, parent_id")
    .eq("slug", slug)
    .single();

  if (unitError || !unit) {
    notFound();
  }

  const { data: children, error: childrenError } = await supabase
    .from("geographic_units")
    .select("id, name, slug, type")
    .eq("parent_id", unit.id)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  const childRows = children || [];
  const childIds = childRows.map((child) => child.id);

  let populationMap = new Map<string, number>();

  if (unit.type === "county") {
    if (childIds.length > 0) {
      const { data: populations } = await supabase
        .from("census_population")
        .select("geographic_unit_id, population")
        .in("geographic_unit_id", childIds);

      populationMap = new Map(
        (populations || []).map((row) => [
          row.geographic_unit_id,
          Number(row.population || 0),
        ])
      );
    }
  } else if (unit.type === "state" || unit.type === "administrative_area") {
    if (childIds.length > 0) {
      const { data: payams } = await supabase
        .from("geographic_units")
        .select("id, parent_id")
        .eq("type", "payam")
        .in("parent_id", childIds);

      const payamRows = payams || [];
      const payamIds = payamRows.map((row) => row.id);

      const payamsByCounty = new Map<string, string[]>();
      for (const payam of payamRows) {
        if (!payam.parent_id) continue;
        const existing = payamsByCounty.get(payam.parent_id) || [];
        existing.push(payam.id);
        payamsByCounty.set(payam.parent_id, existing);
      }

      let populationByPayam = new Map<string, number>();
      if (payamIds.length > 0) {
        const { data: populations } = await supabase
          .from("census_population")
          .select("geographic_unit_id, population")
          .in("geographic_unit_id", payamIds);

        populationByPayam = new Map(
          (populations || []).map((row) => [
            row.geographic_unit_id,
            Number(row.population || 0),
          ])
        );
      }

      for (const countyId of childIds) {
        const countyPayamIds = payamsByCounty.get(countyId) || [];
        const total = countyPayamIds.reduce((sum, payamId) => {
          return sum + (populationByPayam.get(payamId) || 0);
        }, 0);

        populationMap.set(countyId, total);
      }
    }
  }

  const description =
    unit.type === "county"
      ? "Browse payams under this county and view population where available."
      : unit.type === "payam"
        ? "Browse bomas under this payam and view population where available."
        : unit.type === "state" || unit.type === "administrative_area"
          ? "Browse counties under this area and view aggregated population totals."
          : `Browse the hierarchy under this ${unitTypeLabel(unit.type).toLowerCase()}.`;

  const childrenWithPopulation = childRows.map((child) => ({
    ...child,
    population: populationMap.has(child.id)
      ? populationMap.get(child.id) ?? null
      : null,
  }));

  const stateLevelPage =
    unit.type === "state" || unit.type === "administrative_area";

  const stateTotalPopulation = stateLevelPage
    ? childrenWithPopulation.reduce(
        (sum, child) => sum + (child.population || 0),
        0
      )
    : null;

  const rankedChildren = [...childrenWithPopulation].sort((a, b) => {
    const aPop = a.population || 0;
    const bPop = b.population || 0;
    return bPop - aPop || a.name.localeCompare(b.name);
  });

  const topChildren = stateLevelPage ? rankedChildren.slice(0, 3) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <PublicPageIntro
        eyebrow="Census"
        title={unit.name}
        description={description}
      />

      {stateLevelPage ? (
        <section className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Summary
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {unit.name} at a glance
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                <p className="text-sm text-slate-500">Total population</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {new Intl.NumberFormat("en-US").format(
                    stateTotalPopulation || 0
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                <p className="text-sm text-slate-500">Number of counties</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {childrenWithPopulation.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Top counties
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Largest counties by population
            </h2>

            {topChildren.length > 0 ? (
              <div className="mt-5 space-y-3">
                {topChildren.map((child, index) => (
                  <div
                    key={child.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{child.name}</p>
                        <p className="text-sm text-slate-500">County</p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-900">
                      {formatPopulation(child.population) || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                County population summary is not available yet.
              </p>
            )}
          </div>
        </section>
      ) : null}

      <div className="mt-8 flex gap-3">
        <Link
          href="/census"
          className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back to census
        </Link>
      </div>

      {stateLevelPage ? (
        <CensusChildMap
          title={`${unit.name} county map`}
          childrenRows={childrenWithPopulation}
        />
      ) : null}

      <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {childLabel(unit.type)}
          </h2>
        </div>

        {childrenError ? (
          <div className="px-6 py-6 text-sm text-rose-600">
            Failed to load child units.
          </div>
        ) : childRows.length > 0 ? (
          <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
            {childrenWithPopulation.map((child) => {
              const formattedPopulation = formatPopulation(child.population);

              return (
                <Link
                  key={child.id}
                  href={`/census/${child.slug}`}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {child.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {unitTypeLabel(child.type)}
                  </p>

                  {formattedPopulation ? (
                    <p className="mt-3 text-sm text-slate-700">
                      Population:{" "}
                      <span className="font-medium">{formattedPopulation}</span>
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-slate-400">
                      Population not available
                    </p>
                  )}

                  <p className="mt-4 text-sm font-medium text-emerald-700">
                    Open →
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-6 text-sm text-slate-600">
            No child units available yet under this area.
          </div>
        )}
      </div>
    </main>
  );
}