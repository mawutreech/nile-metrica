import { SectionLanding } from "@/components/site/SectionLanding";

export default function LawPage() {
  return (
    <SectionLanding
      eyebrow="Law & Constitution"
      title="Law, constitution, and policy"
      description="Use Nile Metrika as an entry point into the constitutional, legal, and policy framework of South Sudan."
      sections={[
        {
          title: "Constitution",
          description:
            "Anchor legal and institutional reference around the constitution.",
          href: "/law",
        },
        {
          title: "Laws",
          description:
            "Build a navigable structure for major legal instruments and references.",
          href: "/law",
        },
        {
          title: "Regulations",
          description:
            "Connect sectoral governance to operational legal frameworks.",
          href: "/law",
        },
        {
          title: "Policy Frameworks",
          description:
            "Organize national policy directions and public frameworks by theme.",
          href: "/law",
        },
      ]}
      relatedLinks={[
        { title: "Governance", href: "/governance" },
        { title: "Publications", href: "/publications" },
      ]}
    />
  );
}