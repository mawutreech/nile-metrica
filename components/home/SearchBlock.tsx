import { Search } from "lucide-react";
import { Container } from "@/components/common/Container";

const quickLinks = ["Economy", "Population", "Health", "Education", "Agriculture", "Environment"];

export function SearchBlock() {
  return (
    <section className="py-12">
      <Container>
        <div className="nm-card p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
              placeholder="Search indicators, datasets, reports, or topics"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <span key={link} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                {link}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}