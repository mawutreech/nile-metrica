import Link from "next/link";
import { Dataset } from "@/lib/types";

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <Link href={`/datasets/${dataset.slug}`} className="block">
      <div className="nm-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{dataset.theme}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{dataset.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{dataset.description}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {dataset.format}
          </span>
        </div>
        <p className="mt-4 text-sm text-slate-500">Updated {dataset.updatedAt}</p>
      </div>
    </Link>
  );
}