import { SectionLanding } from "@/components/site/SectionLanding";

export default function StatesPage() {
  return (
    <SectionLanding
      eyebrow="States & Territories"
      title="States, territories, and local geography"
      description="Move from national structure into states, administrative areas, counties, payams, and bomas."
      sections={[
        {
          title: "States",
          description:
            "Browse state-level profiles, structures, and linked subnational content.",
          href: "/census",
        },
        {
          title: "Administrative Areas",
          description:
            "Access territorial pages alongside the states within one geographic framework.",
          href: "/census",
        },
        {
          title: "County Profiles",
          description:
            "Drill down into counties, population, maps, and linked subnational profiles.",
          href: "/census",
        },
        {
          title: "Payam & Boma Hierarchy",
          description:
            "Follow the lower levels of local administration and settlement structure.",
          href: "/census",
        },
      ]}
      relatedLinks={[
        { title: "Census Explorer", href: "/census" },
        { title: "Country", href: "/country" },
      ]}
    />
  );
}