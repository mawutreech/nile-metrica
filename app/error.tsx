"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600 sm:text-sm">
          Error
        </p>

        <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
          Something went wrong
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          The page could not be loaded properly. Please try again or return to a
          stable page in the portal.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Go to homepage
          </Link>

          <Link
            href="/search"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Search the portal
          </Link>
        </div>
      </div>
    </main>
  );
}