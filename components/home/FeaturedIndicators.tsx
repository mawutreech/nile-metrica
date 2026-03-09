import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { IndicatorCard } from "@/components/data/IndicatorCard";
import { getHomepageIndicators } from "@/lib/queries";
import Link from "next/link";

export async function FeaturedIndicators() {
  const indicators = await getHomepageIndicators();

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Featured indicators"
            description="Key national statistics for quick public access and high-level monitoring."
          />
          <Link
            href="/data"
            className="inline-flex h-fit items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            View all data
          </Link>
        </div>

        {indicators.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {indicators.map((indicator) => (
              <IndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No indicators available yet.
          </div>
        )}
      </Container>
    </section>
  );
}