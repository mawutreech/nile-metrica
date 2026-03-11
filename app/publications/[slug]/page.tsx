import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PublicPageIntro } from "@/components/site/PublicPageIntro";

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: publication, error } = await supabase
    .from("publications")
    .select(`
      id,
      title,
      slug,
      summary,
      publication_date,
      type,
      file_url
    `)
    .eq("slug", slug)
    .single();

  if (error || !publication) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <PublicPageIntro
        eyebrow="Publication"
        title={publication.title}
        description={
          publication.summary || "Published statistical output and supporting summary."
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Summary</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {publication.summary || "No summary available for this publication."}
          </p>

          <div className="mt-8">
            <Link
              href="/publications"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to publications
            </Link>
          </div>
        </section>

        <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Details</h2>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-slate-900">Type</dt>
              <dd className="mt-1 text-slate-600">
                {publication.type || "Publication"}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-slate-900">Publication date</dt>
              <dd className="mt-1 text-slate-600">
                {publication.publication_date || "N/A"}
              </dd>
            </div>
          </dl>

          {publication.file_url ? (
            <div className="mt-8">
              <a
                href={publication.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Open publication
              </a>
            </div>
          ) : null}
        </aside>
      </div>
    </main>
  );
}