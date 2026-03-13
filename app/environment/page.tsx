import { SectionLanding } from "@/components/site/SectionLanding";

export default function EnvironmentPage() {
  return (
    <SectionLanding
      eyebrow="Environment"
      title="Environment and natural systems"
      description="Explore climate, land, water, forestry, biodiversity, and environmental governance across South Sudan."
      sections={[
        {
          title: "Climate",
          description:
            "Organize climate, variability, and environmental risk into accessible reference pages.",
          href: "/environment",
        },
        {
          title: "Land",
          description:
            "Connect land, territory, and local geography to administration and livelihoods.",
          href: "/environment",
        },
        {
          title: "Water Resources",
          description:
            "Build a structured view of rivers, water systems, and related public issues.",
          href: "/environment",
        },
        {
          title: "Forestry & Biodiversity",
          description:
            "Track environmental assets and conservation-related information.",
          href: "/environment",
        },
        {
          title: "Disaster Risk",
          description:
            "Develop a public reference path for shocks, vulnerability, and environmental risk.",
          href: "/environment",
        },
      ]}
      relatedLinks={[
        { title: "States & Territories", href: "/states" },
        { title: "Publications", href: "/publications" },
      ]}
    />
  );
}