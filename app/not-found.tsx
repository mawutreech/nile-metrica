import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
          404
        </p>

        <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          The page you tried to open does not exist, may have moved, or is not
          available yet.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
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

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <QuickLink title="Data" href="/data" />
          <QuickLink title="Indicators" href="/indicators" />
          <QuickLink title="Publications" href="/publications" />
        </div>
      </div>
    </main>
  );
}

function QuickLink({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      {title}
    </Link>
  );
}