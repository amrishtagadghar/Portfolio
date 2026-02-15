import { Article, CaseStudy, PlayItem } from "@/lib/types";
import { articleCategories, articles, caseStudies, disciplines, getArticle, getCaseStudy, getPlayItem, playItems } from "@/lib/content";
import { hasDatabase, sql } from "@/lib/db";

type CaseStudyRow = {
  title: string;
  slug: string;
  featured: boolean;
  excerpt: string;
  disciplines: string[];
  industry: string;
  year: number;
  role: string;
  timeline: string;
  tools: string[];
  cover_image: string;
  thumbnail: string;
  problem: string;
  goals: string[];
  process: string[];
  highlights: string[];
  deliverables: string[];
  results: string[];
  learnings: string[];
  metrics: { label: string; value: string }[];
};

type ArticleRow = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  published_at: string;
  reading_time: string;
  cover_image: string;
  content: string[];
};

type PlayItemRow = {
  title: string;
  slug: string;
  short_description: string;
  status: "WIP" | "Shipped";
  tags: string[];
  date: string;
  cover_media: string;
  content: string[] | null;
};

let didWarnDbFailure = false;

function warnDbFallback(error: unknown) {
  if (didWarnDbFailure) return;
  didWarnDbFailure = true;
  console.error("Neon query failed, falling back to local content.", error);
}

function mapCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    title: row.title,
    slug: row.slug,
    featured: row.featured,
    excerpt: row.excerpt,
    disciplines: row.disciplines as CaseStudy["disciplines"],
    industry: row.industry,
    year: row.year,
    role: row.role,
    timeline: row.timeline,
    tools: row.tools,
    coverImage: row.cover_image,
    thumbnail: row.thumbnail,
    problem: row.problem,
    goals: row.goals,
    process: row.process,
    highlights: row.highlights,
    deliverables: row.deliverables,
    results: row.results,
    learnings: row.learnings,
    metrics: row.metrics ?? []
  };
}

function mapArticle(row: ArticleRow): Article {
  return {
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    category: row.category as Article["category"],
    tags: row.tags,
    publishedAt: row.published_at,
    readingTime: row.reading_time,
    coverImage: row.cover_image,
    content: row.content ?? []
  };
}

function mapPlayItem(row: PlayItemRow): PlayItem {
  return {
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description,
    status: row.status,
    tags: row.tags as PlayItem["tags"],
    date: row.date,
    coverMedia: row.cover_media,
    content: row.content ?? undefined
  };
}

export async function getCaseStudiesData(): Promise<CaseStudy[]> {
  if (!hasDatabase || !sql) return caseStudies;
  try {
    const rows = await sql<CaseStudyRow[]>`
      SELECT
        title, slug, featured, excerpt, disciplines, industry, year, role, timeline, tools,
        cover_image, thumbnail, problem, goals, process, highlights, deliverables, results, learnings, metrics
      FROM case_studies
      ORDER BY featured DESC, year DESC, title ASC
    `;
    return rows.map(mapCaseStudy);
  } catch (error) {
    warnDbFallback(error);
    return caseStudies;
  }
}

export async function getCaseStudyData(slug: string): Promise<CaseStudy | undefined> {
  if (!hasDatabase || !sql) return getCaseStudy(slug);
  try {
    const rows = await sql<CaseStudyRow[]>`
      SELECT
        title, slug, featured, excerpt, disciplines, industry, year, role, timeline, tools,
        cover_image, thumbnail, problem, goals, process, highlights, deliverables, results, learnings, metrics
      FROM case_studies
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows[0] ? mapCaseStudy(rows[0]) : undefined;
  } catch (error) {
    warnDbFallback(error);
    return getCaseStudy(slug);
  }
}

export async function getArticlesData(): Promise<Article[]> {
  if (!hasDatabase || !sql) return articles;
  try {
    const rows = await sql<ArticleRow[]>`
      SELECT title, slug, excerpt, category, tags, published_at, reading_time, cover_image, content
      FROM articles
      ORDER BY published_at DESC, title ASC
    `;
    return rows.map(mapArticle);
  } catch (error) {
    warnDbFallback(error);
    return articles;
  }
}

export async function getArticleData(slug: string): Promise<Article | undefined> {
  if (!hasDatabase || !sql) return getArticle(slug);
  try {
    const rows = await sql<ArticleRow[]>`
      SELECT title, slug, excerpt, category, tags, published_at, reading_time, cover_image, content
      FROM articles
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows[0] ? mapArticle(rows[0]) : undefined;
  } catch (error) {
    warnDbFallback(error);
    return getArticle(slug);
  }
}

export async function getPlayItemsData(): Promise<PlayItem[]> {
  if (!hasDatabase || !sql) return playItems;
  try {
    const rows = await sql<PlayItemRow[]>`
      SELECT title, slug, short_description, status, tags, date, cover_media, content
      FROM play_items
      ORDER BY date DESC, title ASC
    `;
    return rows.map(mapPlayItem);
  } catch (error) {
    warnDbFallback(error);
    return playItems;
  }
}

export async function getPlayItemData(slug: string): Promise<PlayItem | undefined> {
  if (!hasDatabase || !sql) return getPlayItem(slug);
  try {
    const rows = await sql<PlayItemRow[]>`
      SELECT title, slug, short_description, status, tags, date, cover_media, content
      FROM play_items
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows[0] ? mapPlayItem(rows[0]) : undefined;
  } catch (error) {
    warnDbFallback(error);
    return getPlayItem(slug);
  }
}

export function getDisciplineOptions() {
  return disciplines;
}

export function getArticleCategoryOptions() {
  return articleCategories;
}
