import { SectionLanding } from "@/components/site/SectionLanding";

export default function EconomyPage() {
  return (
    <SectionLanding
      eyebrow="Economy"
      title="Economy and productive sectors"
      description="Explore macroeconomic structure, trade, agriculture, public finance, labour, and wider productive sectors."
      sections={[
        {
          title: "Macroeconomy",
          description:
            "Develop a national reference layer for growth, inflation, and broad economic structure.",
          href: "/economy",
        },
        {
          title: "Public Finance",
          description:
            "Link budgets, revenue, expenditure, and state capacity to public analysis.",
          href: "/economy",
        },
        {
          title: "Trade",
          description:
            "Follow external trade, border flows, and broader market linkages.",
          href: "/economy",
        },
        {
          title: "Agriculture",
          description:
            "Connect agriculture to livelihoods, land, and state-level economic realities.",
          href: "/economy",
        },
        {
          title: "Oil & Extractives",
          description:
            "Reference the national role of extractive sectors in the wider economy.",
          href: "/economy",
        },
      ]}
      relatedLinks={[
        { title: "Indicators", href: "/indicators" },
        { title: "Datasets", href: "/data" },
      ]}
    />
  );
}