import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ThemeCard } from "@/components/data/ThemeCard";
import { getThemes } from "@/lib/queries";
import Link from "next/link";

export async function ThemeGrid() {
  const themes = await getThemes();

  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Browse by theme"
            description="Explore statistics by major subject area, from macroeconomics to social indicators."
          />
          <Link
            href="/data"
            className="inline-flex h-fit items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Browse all themes
          </Link>
        </div>

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
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No themes available yet.
          </div>
        )}
      </Container>
    </section>
  );
}