import type { MetadataRoute } from "next";
import { getArticlesData, getCaseStudiesData, getPlayItemsData } from "@/lib/cms";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, articles, playItems] = await Promise.all([
    getCaseStudiesData(),
    getArticlesData(),
    getPlayItemsData()
  ]);
  const staticRoutes = ["", "/case-studies", "/play", "/blog", "/contact", "/about", "/privacy"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly" as const
  }));

  const caseStudyEntries = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    changeFrequency: "monthly" as const
  }));

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    changeFrequency: "monthly" as const
  }));

  const playEntries = playItems.map((item) => ({
    url: `${baseUrl}/play/${item.slug}`,
    changeFrequency: "monthly" as const
  }));

  return [...staticEntries, ...caseStudyEntries, ...articleEntries, ...playEntries];
}
