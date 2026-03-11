import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PublicPageIntro } from "@/components/site/PublicPageIntro";

export default async function IndicatorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: indicator, error } = await supabase
    .from("indicators")
    .select(`
      id,
      name,
      slug,
      code,
      unit,
      frequency,
      description,
      theme:themes(name),
      source_agency:source_agencies(name)
    `)
    .eq("slug", slug)
    .single();

  if (error || !indicator) {
    notFound();
  }

  const { data: values } = await supabase
    .from("indicator_values")
    .select(`
      id,
      year,
      value,
      date,
      geographic_unit:geographic_units(name)
    `)
    .eq("indicator_id", indicator.id)
    .order("year", { ascending: false })
    .limit(12);

  const themeName = Array.isArray(indicator.theme)
    ? indicator.theme[0]?.name
    : undefined;

  const sourceAgencyName = Array.isArray(indicator.source_agency)
    ? indicator.source_agency[0]?.name
    : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <PublicPageIntro
        eyebrow="Indicator"
        title={indicator.name}
        description={
          indicator.description || "Indicator definition, metadata, and recent values."
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {indicator.description || "No description available for this indicator."}
          </p>

          <div className="mt-8">
            <Link
              href="/indicators"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to indicators
            </Link>
          </div>
        </section>

        <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Metadata</h2>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-slate-900">Code</dt>
              <dd className="mt-1 text-slate-600">{indicator.code || "N/A"}</dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Theme</dt>
              <dd className="mt-1 text-slate-600">
                {themeName || "Uncategorized"}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Source agency</dt>
              <dd className="mt-1 text-slate-600">
                {sourceAgencyName || "Unknown"}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Frequency</dt>
              <dd className="mt-1 text-slate-600">
                {indicator.frequency || "Unknown"}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Unit</dt>
              <dd className="mt-1 text-slate-600">{indicator.unit || "N/A"}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent values</h2>
        </div>

        {values && values.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-slate-600">
                    Geography
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {values.map((row) => {
                  const geographyName = Array.isArray(row.geographic_unit)
                    ? row.geographic_unit[0]?.name
                    : undefined;

                  return (
                    <tr key={row.id}>
                      <td className="px-6 py-4 text-slate-700">
                        {row.year ?? "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {row.value} {indicator.unit || ""}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {row.date || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {geographyName || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-6 text-sm text-slate-600">
            No values available yet for this indicator.
          </div>
        )}
      </section>
    </main>
  );
}