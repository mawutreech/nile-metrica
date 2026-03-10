import { redirect } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/auth";

async function deleteDataset(formData: FormData) {
  "use server";

  const { supabase } = await requireRole(["admin"]);

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    throw new Error("Dataset ID is required.");
  }

  const { error } = await supabase
    .from("datasets")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/datasets");
}

export default async function AdminDatasetsPage() {
  const { profile, supabase } = await requireRole(["admin", "editor", "viewer"]);

  const { data: datasets, error } = await supabase
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
      created_by,
      updated_by,
      created_at,
      updated_at,
      theme:themes(name),
      source_agency:source_agencies(name)
    `)
    .order("update_date", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">
            Manage datasets
          </h1>
          <p className="mt-3 text-slate-600">
            Create and manage downloadable dataset records.
          </p>
        </div>

        {profile.role !== "viewer" ? (
          <Link
            href="/admin/datasets/new"
            className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            New dataset
          </Link>
        ) : null}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Datasets</h2>
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
                      {dataset.format || "Unknown"} • Updated{" "}
                      {dataset.update_date || "N/A"}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {dataset.description || "No description available."}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      /datasets/{dataset.slug}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Source: {sourceAgencyName || "Unknown"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      File: {dataset.file_url ? "Uploaded" : "No file yet"}
                    </p>

                    <div className="mt-3 grid gap-1 text-xs text-slate-400">
                      <p>Created at: {dataset.created_at || "N/A"}</p>
                      <p>Updated at: {dataset.updated_at || "N/A"}</p>
                      <p>Created by: {dataset.created_by || "N/A"}</p>
                      <p>Updated by: {dataset.updated_by || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/datasets/${dataset.slug}`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      View
                    </Link>

                    {profile.role !== "viewer" ? (
                      <>
                        <Link
                          href={`/admin/datasets/${dataset.id}/edit`}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/admin/datasets/${dataset.id}/upload`}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          Upload file
                        </Link>
                      </>
                    ) : null}

                    {profile.role === "admin" ? (
                      <form action={deleteDataset}>
                        <input type="hidden" name="id" value={dataset.id} />
                        <button
                          type="submit"
                          className="rounded-xl border border-rose-200 px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-6 text-sm text-slate-600">
            No datasets yet.
          </div>
        )}
      </div>
    </main>
  );
}