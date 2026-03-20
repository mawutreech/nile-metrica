import Link from "next/link";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "South Sudan Knowledge Portal",
  description:
    "Follow South Sudan through news, analysis, opinion, publications, and structured public information in one place.",
  alternates: {
    canonical: "https://nilemetrica.com",
  },
};

type Story = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  section: string;
  category: string | null;
  published_at: string | null;
  reading_time: number;
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
      {children}
    </p>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="block border border-[#d8d8d8] bg-white p-5 transition hover:bg-[#f8fbf9]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f7f68]">
        {story.category || story.section}
      </p>
      <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#2f2f2f]">
        {story.title}
      </h3>
      {story.excerpt ? (
        <p className="mt-3 text-sm leading-7 text-[#555]">{story.excerpt}</p>
      ) : null}
      <p className="mt-3 text-sm text-slate-500">{story.reading_time} min read</p>
    </Link>
  );
}

function CompactStoryLink({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="block py-5 transition hover:bg-[#fafafa]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f7f68]">
        {story.category || story.section}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-tight text-[#2f2f2f]">
        {story.title}
      </h3>
      <p className="mt-2 text-sm text-slate-500">{story.reading_time} min read</p>
    </Link>
  );
}

function SectionBlock({
  title,
  subtitle,
  stories,
  emptyMessage,
}: {
  title: string;
  subtitle: string;
  stories: Story[];
  emptyMessage: string;
}) {
  return (
    <section className="border-b border-[#dcdcdc] py-10">
      <SectionLabel>{subtitle}</SectionLabel>
      <h2 className="mt-2 text-3xl font-semibold text-[#2f2f2f]">{title}</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stories.length > 0 ? (
          stories.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <div className="border border-[#d8d8d8] bg-white p-5 text-sm text-slate-600">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  const { data } = await supabase
    .from("stories")
    .select(
      "id, title, slug, excerpt, featured_image_url, section, category, published_at, reading_time"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(30);

  const stories: Story[] = data ?? [];

  const southSudanStories = stories
    .filter((s) => s.section === "south-sudan")
    .slice(0, 3);

  const businessStories = stories
    .filter((s) => s.section === "business")
    .slice(0, 3);

  const politicsStories = stories
    .filter((s) => s.section === "politics")
    .slice(0, 3);

  const opinionStories = stories
    .filter((s) => s.section === "opinion")
    .slice(0, 3);

  const cultureSportStories = stories
    .filter((s) => s.section === "culture-sport")
    .slice(0, 3);

  const publicationStories = stories
    .filter(
      (s) =>
        s.category?.toLowerCase().includes("publication") ||
        s.category?.toLowerCase().includes("report") ||
        s.category?.toLowerCase().includes("bulletin")
    )
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="border-b border-[#dcdcdc] py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionLabel>Latest</SectionLabel>
            <h2 className="mt-2 text-3xl font-semibold text-[#2f2f2f]">
              Latest stories
            </h2>

            <div className="mt-6 divide-y divide-[#dcdcdc] border-y border-[#dcdcdc]">
              {stories.length > 0 ? (
                stories.slice(0, 4).map((story) => (
                  <CompactStoryLink key={story.id} story={story} />
                ))
              ) : (
                <div className="py-5 text-sm text-slate-600">
                  No published stories yet.
                </div>
              )}
            </div>
          </div>

          <div>
            <SectionLabel>Publications</SectionLabel>
            <h2 className="mt-2 text-3xl font-semibold text-[#2f2f2f]">
              Reports, bulletins, and reference pieces
            </h2>

            <div className="mt-6 space-y-4">
              {publicationStories.length > 0 ? (
                publicationStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))
              ) : (
                <div className="border border-[#d8d8d8] bg-white p-5 text-sm text-slate-600">
                  Publication-style stories will appear here once published.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SectionBlock
        title="South Sudan"
        subtitle="National reference"
        stories={southSudanStories}
        emptyMessage="South Sudan stories will appear here once published."
      />

      <SectionBlock
        title="Business"
        subtitle="Economy, markets, and data"
        stories={businessStories}
        emptyMessage="Business stories will appear here once published."
      />

      <SectionBlock
        title="Politics"
        subtitle="Public affairs and power"
        stories={politicsStories}
        emptyMessage="Politics stories will appear here once published."
      />

      <SectionBlock
        title="Opinion"
        subtitle="Analysis and commentary"
        stories={opinionStories}
        emptyMessage="Opinion stories will appear here once published."
      />

      <SectionBlock
        title="Culture & Sport"
        subtitle="Heritage, arts, and games"
        stories={cultureSportStories}
        emptyMessage="Culture & Sport stories will appear here once published."
      />
    </main>
  );
}