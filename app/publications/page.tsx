import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { PublicPageIntro } from "@/components/site/PublicPageIntro";

export default async function PublicationsPage() {
  const supabase = await createClient();

  const { data: publications, error } = await supabase
    .from("publications")
    .select("id, title, slug, summary, type, publication_date")
    .order("publication_date", { ascending: false });

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <PublicPageIntro
        eyebrow="Publications"
        title="Reports and statistical outputs"
        description="Browse reports, bulletins, briefs, and other published outputs from the portal."
      />

      <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            All publications
          </h2>
        </div>

        {error ? (
          <div className="px-6 py-6 text-sm text-rose-600">
            Failed to load publications.
          </div>
        ) : publications && publications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {publications.map((publication) => (
              <div
                key={publication.id}
                className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-start md:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {publication.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {publication.type || "Publication"} •{" "}
                    {publication.publication_date || "N/A"}
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {publication.summary || "No summary available."}
                  </p>
                </div>

                <div>
                  <Link
                    href={`/publications/${publication.slug}`}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Open publication
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-6 text-sm text-slate-600">
            No publications available yet.
          </div>
        )}
      </div>
    </main>
  );
}