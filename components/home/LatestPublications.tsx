import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getLatestPublications } from "@/lib/queries";

export async function LatestPublications() {
  const publications = await getLatestPublications(3);

  return (
    <section className="py-12">
      <Container>
        <SectionHeading
          title="Latest publications"
          description="Recent reports, bulletins, and statistical outputs released through Nile Metrika."
        />
        {publications.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {publications.map((publication) => (
              <Link
                key={publication.id}
                href={`/publications/${publication.slug}`}
                className="block"
              >
                <div className="nm-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-sm text-slate-500">
                    {publication.type || "Publication"}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {publication.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {publication.summary || "No summary available."}
                  </p>
                  <p className="mt-4 text-sm text-slate-500">
                    {publication.publication_date || "N/A"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="nm-card p-6 text-sm text-slate-600">
            No publications available yet.
          </div>
        )}
      </Container>
    </section>
  );
}