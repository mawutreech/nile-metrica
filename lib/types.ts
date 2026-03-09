export type Theme = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Indicator = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  theme: string;
  unit: string;
  latestValue: number;
  latestPeriod: string;
  trend: "up" | "down" | "flat";
  series: { label: string; value: number }[];
  definition: string;
  source: string;
  frequency: string;
};

export type Publication = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  type: string;
};

export type Dataset = {
  id: string;
  title: string;
  slug: string;
  description: string;
  theme: string;
  format: string;
  updatedAt: string;
};

export type IndicatorSeriesPoint = {
  label: string;
  value: number;
};

export type SupabaseIndicatorDetail = {
  id: string;
  name: string;
  slug: string;
  unit: string | null;
  frequency: string | null;
  description: string | null;
  source_agency: {
    name: string | null;
  } | null;
  theme: {
    name: string | null;
  } | null;
};

export type HomepageIndicator = {
  id: string;
  name: string;
  slug: string;
  unit: string | null;
  frequency: string | null;
  description: string | null;
  theme: {
    name: string | null;
  } | null;
};

export type IndicatorCardData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  theme: string;
  unit: string;
  latestValue: number;
  latestPeriod: string;
  trend: "up" | "down" | "flat";
  series: { label: string; value: number }[];
  definition: string;
  source: string;
  frequency: string;
};

export type SupabaseTheme = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type SupabaseDataset = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  format: string | null;
  update_date: string | null;
  theme: {
    name: string | null;
  } | null;
};

export type ThemePageIndicator = {
  id: string;
  name: string;
  slug: string;
  unit: string | null;
  frequency: string | null;
  description: string | null;
};

export type SupabaseDatasetDetail = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  format: string | null;
  update_date: string | null;
  publication_date: string | null;
  file_url: string | null;
  theme: {
    name: string | null;
  } | null;
  source_agency: {
    name: string | null;
  } | null;
};

export type SupabasePublication = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  publication_date: string | null;
  type: string | null;
  file_url: string | null;
};

export type SupabasePublicationDetail = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  publication_date: string | null;
  type: string | null;
  file_url: string | null;
};