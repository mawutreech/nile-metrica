import { SectionLanding } from "@/components/site/SectionLanding";

export default function StatisticsPage() {
  return (
    <SectionLanding
      eyebrow="Data & Statistics"
      title="Data, statistics, and structured evidence"
      description="Access datasets, indicators, census structures, methodology, maps, and downloads as one core module within Nile Metrika."
      sections={[
        {
          title: "Datasets",
          description:
            "Browse downloadable datasets with metadata and structured documentation.",
          href: "/data",
        },
        {
          title: "Indicators",
          description:
            "Review measures, definitions, and time-series values.",
          href: "/indicators",
        },
        {
          title: "Census",
          description:
            "Explore states, counties, payams, and population through maps and hierarchy pages.",
          href: "/census",
        },
        {
          title: "Methodology",
          description:
            "Read definitions, notes, and methodological guidance.",
          href: "/methodology",
        },
        {
          title: "Publications",
          description:
            "Connect data products with reports, bulletins, and briefs.",
          href: "/publications",
        },
      ]}
      relatedLinks={[
        { title: "Search", href: "/search" },
        { title: "Publications", href: "/publications" },
      ]}
    />
  );
}