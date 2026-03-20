import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = {
  section: "south-sudan" | "business" | "politics" | "opinion" | "culture-sport";
};

type Story = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  published_at: string | null;
  reading_time: number;
};

export default async function SectionStories({ section }: Props) {
  const supabase = createSupabaseServerClient();

  const { data: stories, error } = await supabase
    .from("stories")
    .select("id, title, slug, excerpt, category, published_at, reading_time")
    .eq("status", "published")
    .eq("section", section)
    .order("published_at", { ascending: false })
    .limit(12);

  if (error) {
    return (
      <section className="mt-12 border-t border-[#dcdcdc] pt-10">
        <div className="border border-[#d8d8d8] bg-white p-5 text-sm text-red-600">
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t border-[#dcdcdc] pt-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stories && stories.length > 0 ? (
          stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="block border border-[#d8d8d8] bg-white p-5 transition hover:bg-[#f8fbf9]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f7f68]">
                {story.category || section}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#2f2f2f]">
                {story.title}
              </h3>
              {story.excerpt ? (
                <p className="mt-3 text-sm leading-7 text-[#555]">
                  {story.excerpt}
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                <span>{story.reading_time} min read</span>
                {story.published_at ? (
                  <span>{new Date(story.published_at).toLocaleDateString()}</span>
                ) : null}
              </div>
            </Link>
          ))
        ) : (
          <div className="border border-[#d8d8d8] bg-white p-5 text-sm text-slate-600">
            No published stories yet for this section.
          </div>
        )}
      </div>
    </section>
  );
}