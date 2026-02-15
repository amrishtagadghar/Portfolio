export type Discipline = "Brand" | "Marketing" | "Product" | "Presentation" | "Web" | "Motion";

export type Metric = {
  label: string;
  value: string;
};

export type CaseStudy = {
  title: string;
  slug: string;
  featured: boolean;
  excerpt: string;
  disciplines: Discipline[];
  industry: string;
  year: number;
  role: string;
  timeline: string;
  tools: string[];
  coverImage: string;
  thumbnail: string;
  problem: string;
  goals: string[];
  process: string[];
  highlights: string[];
  deliverables: string[];
  results: string[];
  learnings: string[];
  metrics: Metric[];
};

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: "Brand" | "Systems" | "Typography" | "Process" | "Career";
  tags: string[];
  publishedAt: string;
  readingTime: string;
  coverImage: string;
  content: string[];
};

export type PlayItem = {
  title: string;
  slug: string;
  shortDescription: string;
  status: "WIP" | "Shipped";
  tags: ("Motion" | "AI" | "Type" | "Code" | "Generative" | "3D")[];
  date: string;
  coverMedia: string;
  content?: string[];
};
