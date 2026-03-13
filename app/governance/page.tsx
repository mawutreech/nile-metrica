import { SectionLanding } from "@/components/site/SectionLanding";

export default function GovernancePage() {
  return (
    <SectionLanding
      eyebrow="Governance"
      title="Governance and public institutions"
      description="Explore how South Sudan is governed through executive structures, public institutions, decentralization, and local government."
      sections={[
        {
          title: "Executive",
          description:
            "Understand the national executive layer and its public role.",
          href: "/governance",
        },
        {
          title: "Legislature",
          description:
            "Reference the legislative structure and broader governance framework.",
          href: "/governance",
        },
        {
          title: "Judiciary",
          description:
            "Link judicial structure to the wider constitutional and legal system.",
          href: "/governance",
        },
        {
          title: "Local Government",
          description:
            "Trace governance below the national level into states and local administration.",
          href: "/states",
        },
        {
          title: "Decentralization",
          description:
            "Understand devolved functions and the structure of subnational governance.",
          href: "/states",
        },
      ]}
      relatedLinks={[
        { title: "Law & Constitution", href: "/law" },
        { title: "States & Territories", href: "/states" },
      ]}
    />
  );
}