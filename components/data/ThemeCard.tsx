import Link from "next/link";
import {
  BarChart3,
  Users,
  HeartPulse,
  GraduationCap,
  Leaf,
  Wheat,
} from "lucide-react";
import { Theme } from "@/lib/types";

function getThemeIcon(name: string) {
  const key = name.toLowerCase();

  if (key.includes("economy")) return BarChart3;
  if (key.includes("population")) return Users;
  if (key.includes("health")) return HeartPulse;
  if (key.includes("education")) return GraduationCap;
  if (key.includes("environment")) return Leaf;
  if (key.includes("agriculture")) return Wheat;

  return BarChart3;
}

export function ThemeCard({ theme }: { theme: Theme }) {
  const Icon = getThemeIcon(theme.name);

  return (
    <Link
      href={`/themes/${theme.slug}`}
      className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-full flex-col">
        <div className="mb-5 inline-flex w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700 transition group-hover:bg-emerald-100">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="text-xl font-semibold text-slate-900">{theme.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {theme.description}
        </p>
      </div>
    </Link>
  );
}