import { SectionLanding } from "@/components/site/SectionLanding";

export default function SocietyPage() {
  return (
    <SectionLanding
      eyebrow="Society & Services"
      title="Society, services, and human development"
      description="Browse education, health, social protection, water, sanitation, and wider public-service themes."
      sections={[
        {
          title: "Education",
          description:
            "Structure national and subnational education reference pages and indicators.",
          href: "/society",
        },
        {
          title: "Health",
          description:
            "Build a public reference layer for health systems, services, and conditions.",
          href: "/society",
        },
        {
          title: "Water & Sanitation",
          description:
            "Connect service access and public infrastructure to local and national pages.",
          href: "/society",
        },
        {
          title: "Social Protection",
          description:
            "Reference social protection systems and population-facing public support.",
          href: "/society",
        },
        {
          title: "Gender & Youth",
          description:
            "Create space for social structure, participation, and demographic themes.",
          href: "/society",
        },
      ]}
      relatedLinks={[
        { title: "Census", href: "/census" },
        { title: "Data & Statistics", href: "/statistics" },
      ]}
    />
  );
}