import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { PublicPageIntro } from "@/components/site/PublicPageIntro";

export default async function DataPage() {
  const supabase = await createClient();

  const { data: datasets, error } = await supabase
    .from("datasets")
    .select(`
      id,
      title,
      slug,
      description,
      format,
      update_date,
      theme:themes(name),
      source_agency:source_agencies(name)
    `)
    .order("update_date", { ascending: false });

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <PublicPageIntro
        eyebrow="Data"
        title="Browse public data"
        description="Explore datasets and supporting metadata in a cleaner, structured public portal."
      />

      <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">All datasets</h2>
        </div>

        {error ? (
          <div className="px-6 py-6 text-sm text-rose-600">
            Failed to load datasets.
          </div>
        ) : datasets && datasets.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {datasets.map((dataset) => {
              const themeName = Array.isArray(dataset.theme)
                ? dataset.theme[0]?.name
                : undefined;

              const sourceAgencyName = Array.isArray(dataset.source_agency)
                ? dataset.source_agency[0]?.name
                : undefined;

              return (
                <div
                  key={dataset.id}
                  className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-start md:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {dataset.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {themeName || "Uncategorized"} •{" "}
                      {dataset.format || "Unknown format"} • Updated{" "}
                      {dataset.update_date || "N/A"}
                    </p>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                      {dataset.description || "No description available."}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      Source: {sourceAgencyName || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/datasets/${dataset.slug}`}
                      className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Open dataset
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-6 text-sm text-slate-600">
            No datasets available yet.
          </div>
        )}
      </div>
    </main>
  );
}