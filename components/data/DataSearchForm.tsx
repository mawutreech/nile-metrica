"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DataSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="nm-card p-6">
      <label htmlFor="data-search" className="mb-3 block text-sm font-medium text-slate-900">
        Search data
      </label>
      <input
        id="data-search"
        type="text"
        defaultValue={searchParams.get("q")?.toString() || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search indicators, datasets, or themes"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
      />
    </div>
  );
}