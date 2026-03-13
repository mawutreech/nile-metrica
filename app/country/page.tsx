import { SectionLanding } from "@/components/site/SectionLanding";

export default function CountryPage() {
  return (
    <SectionLanding
      eyebrow="Country"
      title="South Sudan"
      description="Explore South Sudan through national overview, geography, history, population, and administrative structure."
      sections={[
        {
          title: "Overview",
          description:
            "A structured introduction to South Sudan as a state, society, and public system.",
          href: "/country",
        },
        {
          title: "Geography",
          description:
            "Understand land, regions, borders, rivers, and spatial structure.",
          href: "/country",
        },
        {
          title: "History",
          description:
            "Build a reference path into key historical and state-forming milestones.",
          href: "/country",
        },
        {
          title: "Population",
          description:
            "Browse national and subnational demographic structure and census-linked content.",
          href: "/census",
        },
        {
          title: "Administrative Structure",
          description:
            "Move from the national level into states, administrative areas, counties, payams, and bomas.",
          href: "/states",
        },
      ]}
      relatedLinks={[
        { title: "Governance", href: "/governance" },
        { title: "States & Territories", href: "/states" },
        { title: "Data & Statistics", href: "/statistics" },
      ]}
    />
  );
}