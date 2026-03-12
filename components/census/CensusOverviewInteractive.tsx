"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CensusOverviewMap } from "@/components/census/CensusOverviewMap";

type CountyPopulationRow = {
  id: string;
  name: string;
  slug: string;
  population: number | null;
  parent_name: string | null;
};

function formatPopulation(value: number | null) {
  if (value === null || Number.isNaN(value)) return "N/A";
  return new Intl.NumberFormat("en-US").format(value);
}

export function CensusOverviewInteractive({
  counties,
}: {
  counties: CountyPopulationRow[];
}) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("population-desc");
  const [activeCountySlug, setActiveCountySlug] = useState<string | null>(null);

  const stateOptions = useMemo(() => {
    return Array.from(
      new Set(
        counties
          .map((county) => county.parent_name)
          .filter((value): value is string => !!value)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [counties]);

  const filteredCounties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let result = counties.filter((county) => {
      const matchesQuery =
        !normalizedQuery ||
        county.name.toLowerCase().includes(normalizedQuery) ||
        (county.parent_name || "").toLowerCase().includes(normalizedQuery);

      const matchesState =
        stateFilter === "all" || county.parent_name === stateFilter;

      return matchesQuery && matchesState;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "population-desc") {
        return (b.population || 0) - (a.population || 0) || a.name.localeCompare(b.name);
      }

      if (sortBy === "population-asc") {
        return (a.population || 0) - (b.population || 0) || a.name.localeCompare(b.name);
      }

      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      return a.name.localeCompare(b.name);
    });

    return result;
  }, [counties, query, stateFilter, sortBy]);

  const totalPopulation = useMemo(() => {
    return filteredCounties.reduce((sum, county) => sum + (county.population || 0), 0);
  }, [filteredCounties]);

  const topCounty = filteredCounties[0] || null;

  return (
    <section className="mt-10 space-y-6">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr_0.7fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Search counties
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by county or state..."
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Filter by state / area
            </label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              <option value="all">All states / areas</option>
              {stateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              <option value="population-desc">Population: high to low</option>
              <option value="population-asc">Population: low to high</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Visible counties</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {filteredCounties.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Visible population total</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {formatPopulation(totalPopulation)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Top visible county</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {topCounty ? topCounty.name : "N/A"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {topCounty ? formatPopulation(topCounty.population) : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CensusOverviewMap
          counties={filteredCounties}
          activeCountySlug={activeCountySlug}
          onCountyHover={setActiveCountySlug}
          onCountyLeave={() => setActiveCountySlug(null)}
        />

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              County population table
            </h2>
          </div>

          {filteredCounties.length > 0 ? (
            <div className="max-h-[720px] overflow-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="sticky top-0 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-slate-600">
                      County
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-slate-600">
                      State / Area
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-slate-600">
                      Population
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredCounties.map((county) => {
                    const isActive = activeCountySlug === county.slug;

                    return (
                      <tr
                        key={county.id}
                        onMouseEnter={() => setActiveCountySlug(county.slug)}
                        onMouseLeave={() => setActiveCountySlug(null)}
                        className={isActive ? "bg-emerald-50" : ""}
                      >
                        <td className="px-6 py-4 text-slate-700">
                          <Link
                            href={`/census/${county.slug}`}
                            className="font-medium text-slate-900 transition hover:text-emerald-700"
                          >
                            {county.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {county.parent_name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {formatPopulation(county.population)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-6 text-sm text-slate-600">
              No counties match your current filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}