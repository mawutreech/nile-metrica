import Image from "next/image";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type StoryAuthor = {
  id: string;
  display_name: string | null;
  full_name: string | null;
  role: string | null;
  avatar_url: string | null;
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
  reading_time: number | null;
  author_id: string | null;
  author: StoryAuthor[] | null;
};

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function labelForStory(story: Pick<Story, "section" | "category">) {
  if (story.category?.trim()) return story.category;

  switch (story.section) {
    case "south-sudan":
      return "News";
    case "politics":
      return "Politics";
    case "business":
      return "Business & Tech";
    case "opinion":
      return "Opinion";
    case "health":
      return "Health";
    case "education":
      return "Education";
    case "environment":
      return "Environment";
    case "states-territories":
      return "States & Territories";
    case "data-statistics":
      return "Data & Statistics";
    case "culture-sport":
      return "Culture & Sport";
    default:
      return "Story";
  }
}

function StoryCard({ story }: { story: Story }) {
  const linkedAuthor = story.author?.[0] ?? null;
  const authorName =
    linkedAuthor?.display_name || linkedAuthor?.full_name || "Editor";
  const authorRole = linkedAuthor?.role || "Contributor at Nile Metrica";
  const authorAvatar = linkedAuthor?.avatar_url || null;

  const showAuthorFallback =
    story.section === "opinion" && !story.featured_image_url;

  return (
    <article className="overflow-hidden border border-[#d8d8d8] bg-white">
      {story.featured_image_url ? (
        <Link href={`/stories/${story.slug}`} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f2f2f2]">
            <Image
              src={story.featured_image_url}
              alt={story.title}
              fill
              className="object-cover transition duration-300 hover:scale-[1.02]"
              unoptimized
            />
          </div>
        </Link>
      ) : showAuthorFallback ? (
        <div className="flex min-h-[240px] items-center bg-[#eef3f6] p-6">
          <div className="flex items-center gap-4">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d7dfe5] text-2xl font-semibold text-[#223]">
                {authorName.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f5a5a]">
                By {authorName}
              </p>
              <p className="mt-1 text-sm text-slate-600">{authorRole}</p>
              {(story.published_at || story.reading_time) && (
                <p className="mt-2 text-xs text-slate-500">
                  {story.published_at ? formatDate(story.published_at) : ""}
                  {story.published_at && story.reading_time ? " · " : ""}
                  {story.reading_time ? `${story.reading_time} min read` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center bg-[#f3f3f3] text-sm text-slate-500">
          No image available
        </div>
      )}

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f7f68]">
          {labelForStory(story)}
        </p>

        <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#2f2f2f]">
          <Link href={`/stories/${story.slug}`} className="hover:underline">
            {story.title}
          </Link>
        </h2>

        {story.excerpt ? (
          <p className="mt-3 text-sm leading-7 text-[#555]">{story.excerpt}</p>
        ) : null}

        <Link
          href={`/stories/${story.slug}`}
          className="mt-4 inline-block text-sm font-medium text-[#0f3f75] hover:underline"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}

function CompactStoryLink({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="block border-b border-[#dcdcdc] py-5 last:border-b-0 hover:bg-[#fafafa]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f7f68]">
        {labelForStory(story)}
      </p>

      <h3 className="mt-2 text-xl font-semibold leading-tight text-[#2f2f2f]">
        {story.title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {story.published_at ? formatDate(story.published_at) : ""}
        {story.published_at && story.reading_time ? " · " : ""}
        {story.reading_time ? `${story.reading_time} min read` : ""}
      </p>
    </Link>
  );
}

function SectionBlock({
  title,
  subtitle,
  stories,
}: {
  title: string;
  subtitle: string;
  stories: Story[];
}) {
  if (!stories.length) return null;

  return (
    <section className="border-b border-[#dcdcdc] py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7f68]">
        {subtitle}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#2f2f2f]">{title}</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  const { data } = await supabase
    .from("stories")
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      section,
      category,
      published_at,
      reading_time,
      author_id,
      author:authors!stories_author_id_fkey (
        id,
        display_name,
        full_name,
        role,
        avatar_url
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(30);

  const stories: Story[] = (data as Story[]) ?? [];

  const latestStories = stories.slice(0, 4);

  const publicationStories = stories
    .filter(
      (s) =>
        s.category?.toLowerCase().includes("publication") ||
        s.category?.toLowerCase().includes("report") ||
        s.category?.toLowerCase().includes("bulletin")
    )
    .slice(0, 3);

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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {latestStories.length > 0 ? (
        <section className="border-b border-[#dcdcdc] py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <StoryCard story={latestStories[0]} />
            </div>

            <div>
              {latestStories.slice(1).map((story) => (
                <CompactStoryLink key={story.id} story={story} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <SectionBlock
        title="Reports, bulletins, and reference pieces"
        subtitle="Publications"
        stories={publicationStories}
      />

      <SectionBlock
        title="South Sudan"
        subtitle="National reference"
        stories={southSudanStories}
      />

      <SectionBlock
        title="Business"
        subtitle="Economy, markets, and data"
        stories={businessStories}
      />

      <SectionBlock
        title="Politics"
        subtitle="Public affairs and power"
        stories={politicsStories}
      />

      <SectionBlock
        title="Opinion"
        subtitle="Analysis and commentary"
        stories={opinionStories}
      />

      <SectionBlock
        title="Culture & Sport"
        subtitle="Heritage, arts, and games"
        stories={cultureSportStories}
      />
    </main>
  );
}