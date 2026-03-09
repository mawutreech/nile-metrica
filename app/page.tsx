import { Hero } from "@/components/home/Hero";
import { SearchBlock } from "@/components/home/SearchBlock";
import { FeaturedIndicators } from "@/components/home/FeaturedIndicators";
import { ThemeGrid } from "@/components/home/ThemeGrid";
import { LatestPublications } from "@/components/home/LatestPublications";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchBlock />
      <FeaturedIndicators />
      <ThemeGrid />
      <LatestPublications />
    </>
  );
}
