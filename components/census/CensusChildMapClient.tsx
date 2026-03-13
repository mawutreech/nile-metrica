"use client";

import dynamic from "next/dynamic";

const CensusChildMapInner = dynamic(
  () => import("./CensusChildMapInner").then((m) => m.CensusChildMapInner),
  { ssr: false }
);

type ChildRow = {
  id: string;
  name: string;
  slug: string;
  type: string | null;
  population: number | null;
};

export function CensusChildMapClient({
  title,
  childrenRows,
}: {
  title: string;
  childrenRows: ChildRow[];
}) {
  return <CensusChildMapInner title={title} childrenRows={childrenRows} />;
}