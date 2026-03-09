import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { IndicatorCard } from "@/components/data/IndicatorCard";
import { getHomepageIndicators } from "@/lib/queries";

export async function FeaturedIndicators() {
  const indicators = await getHomepageIndicators();

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          title="Featured indicators"
          description="Key national statistics for quick public access and high-level monitoring."
        />
        {indicators.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {indicators.map((indicator) => (
              <IndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        ) : (
          <div className="nm-card p-6 text-sm text-slate-600">
            No indicators available yet.
          </div>
        )}
      </Container>
    </section>
  );
}