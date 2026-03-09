import Link from "next/link";
import { ArrowUpRight, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Indicator } from "@/lib/types";

export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const TrendIcon =
    indicator.trend === "up" ? TrendingUp : indicator.trend === "down" ? TrendingDown : Minus;

  return (
    <Link href={`/indicators/${indicator.slug}`} className="nm-card block p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{indicator.theme}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{indicator.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{indicator.shortDescription}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-slate-400" />
      </div>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-3xl font-semibold tracking-tight">
            {indicator.latestValue}
            <span className="ml-1 text-base text-slate-500">{indicator.unit}</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">{indicator.latestPeriod}</p>
        </div>
        <TrendIcon className="h-5 w-5 text-slate-500" />
      </div>
    </Link>
  );
}