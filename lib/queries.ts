import { supabase } from "./supabase";
import {
  HomepageIndicator,
  IndicatorCardData,
  IndicatorSeriesPoint,
  SupabaseDataset,
  SupabaseDatasetDetail,
  SupabaseIndicatorDetail,
  SupabasePublication,
  SupabasePublicationDetail,
  SupabaseTheme,
  ThemePageIndicator,
  HeroStat,
} from "./types";

export async function getIndicatorBySlug(slug: string): Promise<SupabaseIndicatorDetail | null> {
  const { data, error } = await supabase
    .from("indicators")
    .select(`
      id,
      name,
      slug,
      unit,
      frequency,
      description,
      source_agency:source_agencies(name),
      theme:themes(name)
    `)
    .eq("slug", slug)
    .maybeSingle();

 if (error) {
  console.error("Error fetching indicator:", error);
  return null;
}

if (!data) {
  return null;
}

  return data as unknown as SupabaseIndicatorDetail;
}

export async function getIndicatorSeries(indicatorId: string): Promise<IndicatorSeriesPoint[]> {
  const { data, error } = await supabase
    .from("indicator_values")
    .select("year, value")
    .eq("indicator_id", indicatorId)
    .order("year", { ascending: true });

  if (error || !data) {
    console.error("Error fetching indicator series:", error);
    return [];
  }

  return data.map((row) => ({
    label: String(row.year),
    value: Number(row.value),
  }));
}

export async function getHomepageIndicators(): Promise<IndicatorCardData[]> {
  const { data, error } = await supabase
    .from("indicators")
    .select(`
      id,
      name,
      slug,
      unit,
      frequency,
      description,
      theme:themes(name)
    `)
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error fetching homepage indicators:", error);
    return [];
  }

  const indicators = data as unknown as HomepageIndicator[];

  const results = await Promise.all(
    indicators.map(async (indicator) => {
      const series = await getIndicatorSeries(indicator.id);

      if (series.length === 0) return null;

      const latestPoint = series[series.length - 1];
      const previousPoint = series.length > 1 ? series[series.length - 2] : null;

      let trend: "up" | "down" | "flat" = "flat";
      if (previousPoint) {
        if (latestPoint.value > previousPoint.value) trend = "up";
        else if (latestPoint.value < previousPoint.value) trend = "down";
      }

      return {
        id: indicator.id,
        name: indicator.name,
        slug: indicator.slug,
        shortDescription: indicator.description || "No description available.",
        theme: indicator.theme?.name || "Uncategorized",
        unit: indicator.unit || "",
        latestValue: latestPoint.value,
        latestPeriod: latestPoint.label,
        trend,
        series,
        definition: indicator.description || "",
        source: "",
        frequency: indicator.frequency || "",
      } satisfies IndicatorCardData;
    })
  );

  return results.filter((item): item is IndicatorCardData => item !== null);
}

export async function getThemes(): Promise<SupabaseTheme[]> {
  const { data, error } = await supabase
    .from("themes")
    .select("id, name, slug, description")
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error fetching themes:", error);
    return [];
  }

  return data as SupabaseTheme[];
}

export async function getThemeBySlug(slug: string): Promise<SupabaseTheme | null> {
  const { data, error } = await supabase
    .from("themes")
    .select("id, name, slug, description")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching theme:", error);
    return null;
  }

  return data as SupabaseTheme;
}

export async function getDatasets(): Promise<SupabaseDataset[]> {
  const { data, error } = await supabase
    .from("datasets")
    .select(`
      id,
      title,
      slug,
      description,
      format,
      update_date,
      theme:themes(name)
    `)
    .order("title", { ascending: true });

  if (error || !data) {
    console.error("Error fetching datasets:", error);
    return [];
  }

  return data as unknown as SupabaseDataset[];
}

export async function getDatasetsByTheme(themeId: string): Promise<SupabaseDataset[]> {
  const { data, error } = await supabase
    .from("datasets")
    .select(`
      id,
      title,
      slug,
      description,
      format,
      update_date,
      theme:themes(name)
    `)
    .eq("theme_id", themeId)
    .order("title", { ascending: true });

  if (error || !data) {
    console.error("Error fetching datasets by theme:", error);
    return [];
  }

  return data as unknown as SupabaseDataset[];
}

export async function getDatasetBySlug(slug: string): Promise<SupabaseDatasetDetail | null> {
  const { data, error } = await supabase
    .from("datasets")
    .select(`
      id,
      title,
      slug,
      description,
      format,
      update_date,
      publication_date,
      file_url,
      theme:themes(name),
      source_agency:source_agencies(name)
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching dataset:", error);
    return null;
  }

  return data as unknown as SupabaseDatasetDetail;
}

export async function getIndicatorsByTheme(themeId: string): Promise<IndicatorCardData[]> {
  const { data, error } = await supabase
    .from("indicators")
    .select(`
      id,
      name,
      slug,
      unit,
      frequency,
      description
    `)
    .eq("theme_id", themeId)
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error fetching indicators by theme:", error);
    return [];
  }

  const indicators = data as ThemePageIndicator[];

  const results = await Promise.all(
    indicators.map(async (indicator) => {
      const series = await getIndicatorSeries(indicator.id);

      if (series.length === 0) return null;

      const latestPoint = series[series.length - 1];
      const previousPoint = series.length > 1 ? series[series.length - 2] : null;

      let trend: "up" | "down" | "flat" = "flat";
      if (previousPoint) {
        if (latestPoint.value > previousPoint.value) trend = "up";
        else if (latestPoint.value < previousPoint.value) trend = "down";
      }

      return {
        id: indicator.id,
        name: indicator.name,
        slug: indicator.slug,
        shortDescription: indicator.description || "No description available.",
        theme: "",
        unit: indicator.unit || "",
        latestValue: latestPoint.value,
        latestPeriod: latestPoint.label,
        trend,
        series,
        definition: indicator.description || "",
        source: "",
        frequency: indicator.frequency || "",
      } satisfies IndicatorCardData;
    })
  );

  return results.filter((item): item is IndicatorCardData => item !== null);
}

export async function getPublications(): Promise<SupabasePublication[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("id, title, slug, summary, publication_date, type, file_url")
    .order("publication_date", { ascending: false });

  if (error || !data) {
    console.error("Error fetching publications:", error);
    return [];
  }

  return data as SupabasePublication[];
}

export async function getLatestPublications(limit = 3): Promise<SupabasePublication[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("id, title, slug, summary, publication_date, type, file_url")
    .order("publication_date", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error("Error fetching latest publications:", error);
    return [];
  }

  return data as SupabasePublication[];
}

export async function getPublicationBySlug(slug: string): Promise<SupabasePublicationDetail | null> {
  const { data, error } = await supabase
    .from("publications")
    .select("id, title, slug, summary, publication_date, type, file_url")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching publication:", error);
    return null;
  }

  return data as SupabasePublicationDetail;
}

export async function searchThemes(query: string): Promise<SupabaseTheme[]> {
  if (!query.trim()) return getThemes();

  const { data, error } = await supabase
    .from("themes")
    .select("id, name, slug, description")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error searching themes:", error);
    return [];
  }

  return data as SupabaseTheme[];
}

export async function searchDatasets(query: string): Promise<SupabaseDataset[]> {
  if (!query.trim()) return getDatasets();

  const { data, error } = await supabase
    .from("datasets")
    .select(`
      id,
      title,
      slug,
      description,
      format,
      update_date,
      theme:themes(name)
    `)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order("title", { ascending: true });

  if (error || !data) {
    console.error("Error searching datasets:", error);
    return [];
  }

  return data as unknown as SupabaseDataset[];
}

export async function searchIndicators(query: string): Promise<IndicatorCardData[]> {
  if (!query.trim()) return getHomepageIndicators();

  const { data, error } = await supabase
    .from("indicators")
    .select(`
      id,
      name,
      slug,
      unit,
      frequency,
      description,
      theme:themes(name)
    `)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error searching indicators:", error);
    return [];
  }

  const indicators = data as unknown as HomepageIndicator[];

  const results = await Promise.all(
    indicators.map(async (indicator) => {
      const series = await getIndicatorSeries(indicator.id);
      if (series.length === 0) return null;

      const latestPoint = series[series.length - 1];
      const previousPoint = series.length > 1 ? series[series.length - 2] : null;

      let trend: "up" | "down" | "flat" = "flat";
      if (previousPoint) {
        if (latestPoint.value > previousPoint.value) trend = "up";
        else if (latestPoint.value < previousPoint.value) trend = "down";
      }

      return {
        id: indicator.id,
        name: indicator.name,
        slug: indicator.slug,
        shortDescription: indicator.description || "No description available.",
        theme: indicator.theme?.name || "Uncategorized",
        unit: indicator.unit || "",
        latestValue: latestPoint.value,
        latestPeriod: latestPoint.label,
        trend,
        series,
        definition: indicator.description || "",
        source: "",
        frequency: indicator.frequency || "",
      } satisfies IndicatorCardData;
    })
  );

  return results.filter((item): item is IndicatorCardData => item !== null);
}

export async function getHeroStats(): Promise<HeroStat[]> {
  const configs = [
    {
      slug: "population-total",
      label: "Population",
      format: (value: number) => `${value}M`,
      periodPrefix: "Estimated, ",
    },
    {
      slug: "inflation-rate",
      label: "Inflation",
      format: (value: number) => `${value}%`,
      periodPrefix: "",
    },
    {
      slug: "school-enrolment-rate",
      label: "School Enrolment",
      format: (value: number) => `${value}%`,
      periodPrefix: "",
    },
    {
      slug: "vaccination-coverage",
      label: "Vaccination Coverage",
      format: (value: number) => `${value}%`,
      periodPrefix: "",
    },
  ];

  const results = await Promise.all(
    configs.map(async (config) => {
      const indicator = await getIndicatorBySlug(config.slug);

      if (!indicator) {
        return {
          label: config.label,
          value: "—",
          period: "No data yet",
          href: `/indicators/${config.slug}`,
        };
      }

      const series = await getIndicatorSeries(indicator.id);
      const latestPoint = series.length > 0 ? series[series.length - 1] : null;

      if (!latestPoint) {
        return {
          label: config.label,
          value: "—",
          period: "No data yet",
          href: `/indicators/${config.slug}`,
        };
      }

      return {
        label: config.label,
        value: config.format(latestPoint.value),
        period: `${config.periodPrefix}${latestPoint.label}`,
        href: `/indicators/${config.slug}`,
      };
    })
  );

  return results;
}