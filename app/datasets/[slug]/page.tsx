import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PublicPageIntro } from "@/components/site/PublicPageIntro";

export default async function DatasetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: dataset, error } = await supabase
    .from("datasets")
    .select(`
      id,
      title,
      slug,
      description,
      publication_date,
      update_date,
      format,
      file_url,
      theme:themes(name),
      source_agency:source_agencies(name)
    `)
    .eq("slug", slug)
    .single();

  if (error || !dataset) {
    notFound();
  }

  const themeName = Array.isArray(dataset.theme)
    ? dataset.theme[0]?.name
    : undefined;

  const sourceAgencyName = Array.isArray(dataset.source_agency)
    ? dataset.source_agency[0]?.name
    : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <PublicPageIntro
        eyebrow="Dataset"
        title={dataset.title}
        description={
          dataset.description || "Structured public dataset with linked metadata."
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {dataset.description || "No description available for this dataset."}
          </p>

          <div className="mt-8">
            <Link
              href="/data"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to data
            </Link>
          </div>
        </section>

        <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Metadata</h2>

          <dl className="mt-5 space-y-4 text-sm">
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
              <dt className="font-medium text-slate-900">Format</dt>
              <dd className="mt-1 text-slate-600">
                {dataset.format || "Unknown"}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Publication date</dt>
              <dd className="mt-1 text-slate-600">
                {dataset.publication_date || "N/A"}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Last updated</dt>
              <dd className="mt-1 text-slate-600">
                {dataset.update_date || "N/A"}
              </dd>
            </div>
          </dl>

          {dataset.file_url ? (
            <div className="mt-8">
              <a
                href={dataset.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Download dataset
              </a>
            </div>
          ) : null}
        </aside>
      </div>
    </main>
  );
}