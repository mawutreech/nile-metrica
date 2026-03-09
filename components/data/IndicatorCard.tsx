import Link from "next/link";
import {
  ArrowUpRight,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Indicator } from "@/lib/types";

export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const TrendIcon =
    indicator.trend === "up"
      ? TrendingUp
      : indicator.trend === "down"
        ? TrendingDown
        : Minus;

  const trendLabel =
    indicator.trend === "up"
      ? "Rising"
      : indicator.trend === "down"
        ? "Falling"
        : "Stable";

  return (
    <Link
      href={`/indicators/${indicator.slug}`}
      className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {indicator.theme}
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
            {indicator.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {indicator.shortDescription}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-2 text-slate-500 transition group-hover:bg-slate-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-slate-900">
            {indicator.latestValue}
            <span className="ml-1 text-base font-medium text-slate-500">
              {indicator.unit}
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-500">{indicator.latestPeriod}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
          <TrendIcon className="h-4 w-4" />
          <span>{trendLabel}</span>
        </div>
      </div>
    </Link>
  );
}