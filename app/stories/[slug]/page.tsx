export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createSupabaseServerClient();

  const { data: story, error } = await supabase
    .from("stories")
    .select(
      "id, title, excerpt, body_html, featured_image_url, published_at, reading_time, section, category, author_id"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !story) {
    notFound();
  }

  const { data: author } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url")
    .eq("id", story.author_id)
    .single();

  const storyUrl = `https://nilemetrica.com/stories/${slug}`;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8 border-b border-slate-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          {story.category || story.section}
        </p>

        <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
          {story.title}
        </h1>

        {author ? (
          <section className="mt-6 border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start gap-4">
              {author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={author.full_name || "Author"}
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-600">
                  {author.full_name?.charAt(0).toUpperCase() || "A"}
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Author
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  {author.full_name || "Unknown author"}
                </h2>
                {author.bio ? (
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {author.bio}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {story.excerpt ? (
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {story.excerpt}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          {story.published_at ? (
            <span>{new Date(story.published_at).toLocaleDateString()}</span>
          ) : null}
          <span>{story.reading_time} min read</span>
        </div>
      </header>

      {story.featured_image_url ? (
        <div className="mb-8">
          <img
            src={story.featured_image_url}
            alt={story.title}
            className="w-full border object-cover"
          />
        </div>
      ) : null}

      <article
        className="prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700"
        dangerouslySetInnerHTML={{ __html: story.body_html }}
      />

      <div className="mt-10 border-t pt-6">
        <p className="mb-3 font-medium text-slate-900">Share this story</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              storyUrl
            )}&text=${encodeURIComponent(story.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-4 py-2 text-sm"
          >
            X
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              storyUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-4 py-2 text-sm"
          >
            Facebook
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `${story.title} ${storyUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-4 py-2 text-sm"
          >
            WhatsApp
          </a>

          <Link href="/" className="border px-4 py-2 text-sm">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}