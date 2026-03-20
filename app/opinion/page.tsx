export const dynamic = "force-dynamic";
export const revalidate = 0;
import SectionStories from "@/components/site/SectionStories";

export default function OpinionPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
        Opinion
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-[#2f2f2f]">
        Commentary, essays, and analysis
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#555]">
        Read commentary, perspective, editorials, and analysis from Nile Metrica contributors.
      </p>

      <SectionStories section="opinion" />
    </main>
  );
}