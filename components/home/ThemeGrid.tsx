import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ThemeCard } from "@/components/data/ThemeCard";
import { getThemes } from "@/lib/queries";

export async function ThemeGrid() {
  const themes = await getThemes();

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          title="Browse by theme"
          description="Explore statistics by major subject area, from macroeconomics to social indicators."
        />
        {themes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={{
                  id: theme.id,
                  name: theme.name,
                  slug: theme.slug,
                  description: theme.description || "",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="nm-card p-6 text-sm text-slate-600">
            No themes available yet.
          </div>
        )}
      </Container>
    </section>
  );
}