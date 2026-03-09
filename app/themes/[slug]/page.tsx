import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { IndicatorCard } from "@/components/data/IndicatorCard";
import { DatasetCard } from "@/components/data/DatasetCard";
import { getDatasetsByTheme, getIndicatorsByTheme, getThemeBySlug } from "@/lib/queries";

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const theme = await getThemeBySlug(slug);

  if (!theme) return notFound();

  const themeIndicators = await getIndicatorsByTheme(theme.id);
  const themeDatasets = await getDatasetsByTheme(theme.id);

  return (
    <>
      <PageHero title={theme.name} description={theme.description || "Theme page"} />
      <section className="py-12">
        <Container>
          <div>
            <h2 className="text-2xl font-semibold">Indicators</h2>
            {themeIndicators.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {themeIndicators.map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={{ ...indicator, theme: theme.name }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 nm-card p-6 text-sm text-slate-600">
                No indicators available for this theme yet.
              </div>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold">Datasets</h2>
            {themeDatasets.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {themeDatasets.map((dataset) => (
                  <DatasetCard
                    key={dataset.id}
                    dataset={{
                      id: dataset.id,
                      title: dataset.title,
                      slug: dataset.slug,
                      description: dataset.description || "",
                      theme: dataset.theme?.name || theme.name,
                      format: dataset.format || "Unknown",
                      updatedAt: dataset.update_date || "N/A",
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 nm-card p-6 text-sm text-slate-600">
                No datasets available for this theme yet.
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}