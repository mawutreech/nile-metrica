import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Government Act, 2009 | Nile Metrica",
  description:
    "Explore the Local Government Act, 2009 and its role in defining local government structures, powers, functions, duties, and finances in South Sudan.",
};

const keyAreas = [
  "Establishment of local government structures",
  "Powers, functions, and duties of local authorities",
  "Administrative and institutional arrangements",
  "Local government finance and related matters",
];

export default function LocalGovernmentActPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
      <section className="border border-[#d9d2c3] bg-[#f7f4ee] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
          Law & Constitution
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2f2f2f] sm:text-5xl">
          Local Government Act, 2009
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#555]">
          This Act provides the legal framework for local government in South
          Sudan, including local government structures, powers, functions,
          duties, finances, and related administrative matters.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/docs/local-government-act-2009.pdf"
            target="_blank"
            className="bg-[#2f6e57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#285f4b]"
          >
            Open PDF
          </Link>

          <Link
            href="/law"
            className="border border-[#d2d2d2] bg-white px-5 py-3 text-sm font-medium text-[#444] transition hover:bg-[#f6f6f6]"
          >
            Back to Law
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-[#d8d8d8] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#2f2f2f]">
            Why this Act matters
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#555] sm:text-base">
            The Local Government Act is a core legal reference for understanding
            local governance in South Sudan. It is especially relevant for work
            on counties, payams, bomas, decentralization, local administration,
            and the relationship between national and subnational institutions.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#555] sm:text-base">
            Within Nile Metrica, this page serves as a public entry point into
            the legal framework behind local government structures and related
            governance arrangements.
          </p>
        </div>

        <div className="border border-[#d8d8d8] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
            Key areas covered
          </p>
          <div className="mt-4 space-y-3">
            {keyAreas.map((item) => (
              <div
                key={item}
                className="border border-[#e4e0d7] bg-[#faf8f3] px-4 py-4"
              >
                <p className="text-sm font-medium text-[#2f2f2f]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 border border-[#d8d8d8] bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
          Related portal sections
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/governance"
            className="border border-[#d2d2d2] bg-[#faf8f3] px-4 py-2 text-sm font-medium text-[#444] transition hover:bg-[#f2f8f5] hover:text-[#2f6e57]"
          >
            Governance
          </Link>
          <Link
            href="/states"
            className="border border-[#d2d2d2] bg-[#faf8f3] px-4 py-2 text-sm font-medium text-[#444] transition hover:bg-[#f2f8f5] hover:text-[#2f6e57]"
          >
            States & Territories
          </Link>
          <Link
            href="/census"
            className="border border-[#d2d2d2] bg-[#faf8f3] px-4 py-2 text-sm font-medium text-[#444] transition hover:bg-[#f2f8f5] hover:text-[#2f6e57]"
          >
            Census Explorer
          </Link>
        </div>
      </section>
    </main>
  );
}