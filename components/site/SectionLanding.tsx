import Link from "next/link";

type SectionLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: {
    title: string;
    description: string;
    href: string;
  }[];
  relatedLinks?: {
    title: string;
    href: string;
  }[];
};

export function SectionLanding({
  eyebrow,
  title,
  description,
  sections,
  relatedLinks = [],
}: SectionLandingProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {section.description}
            </p>
            <p className="mt-4 text-sm font-medium text-emerald-700">
              Open →
            </p>
          </Link>
        ))}
      </div>

      {relatedLinks.length > 0 ? (
        <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
            Related portal sections
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}