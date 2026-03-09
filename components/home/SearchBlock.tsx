import { Search } from "lucide-react";
import { Container } from "@/components/common/Container";

const quickLinks = [
  "Economy",
  "Population",
  "Health",
  "Education",
  "Agriculture",
  "Environment",
];

export function SearchBlock() {
  return (
    <section className="bg-white py-12">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Search the portal
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Find indicators, datasets, reports, or topics
            </h2>
          </div>

          <div className="relative mt-6">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
              placeholder="Search indicators, datasets, reports, or topics"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <span
                key={link}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}