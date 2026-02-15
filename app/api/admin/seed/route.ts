import { NextResponse } from "next/server";
import { articles, caseStudies, playItems } from "@/lib/content";
import { hasDatabase, sql } from "@/lib/db";

export async function POST(request: Request) {
  const expectedToken = process.env.SEED_TOKEN;
  const providedToken = request.headers.get("x-seed-token");

  if (!expectedToken) {
    return NextResponse.json({ ok: false, error: "SEED_TOKEN is not configured." }, { status: 500 });
  }

  if (!providedToken || providedToken !== expectedToken) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!hasDatabase || !sql) {
    return NextResponse.json({ ok: false, error: "Database is not configured." }, { status: 500 });
  }

  try {
    await sql.begin(async (tx) => {
      for (const study of caseStudies) {
        await tx`
          INSERT INTO case_studies (
            title, slug, featured, excerpt, disciplines, industry, year, role, timeline, tools,
            cover_image, thumbnail, problem, goals, process, highlights, deliverables, results, learnings, metrics
          ) VALUES (
            ${study.title}, ${study.slug}, ${study.featured}, ${study.excerpt}, ${study.disciplines}, ${study.industry},
            ${study.year}, ${study.role}, ${study.timeline}, ${study.tools}, ${study.coverImage}, ${study.thumbnail},
            ${study.problem}, ${study.goals}, ${study.process}, ${study.highlights}, ${study.deliverables},
            ${study.results}, ${study.learnings}, ${JSON.stringify(study.metrics)}::jsonb
          )
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            featured = EXCLUDED.featured,
            excerpt = EXCLUDED.excerpt,
            disciplines = EXCLUDED.disciplines,
            industry = EXCLUDED.industry,
            year = EXCLUDED.year,
            role = EXCLUDED.role,
            timeline = EXCLUDED.timeline,
            tools = EXCLUDED.tools,
            cover_image = EXCLUDED.cover_image,
            thumbnail = EXCLUDED.thumbnail,
            problem = EXCLUDED.problem,
            goals = EXCLUDED.goals,
            process = EXCLUDED.process,
            highlights = EXCLUDED.highlights,
            deliverables = EXCLUDED.deliverables,
            results = EXCLUDED.results,
            learnings = EXCLUDED.learnings,
            metrics = EXCLUDED.metrics,
            updated_at = NOW()
        `;
      }

      for (const article of articles) {
        await tx`
          INSERT INTO articles (
            title, slug, excerpt, category, tags, published_at, reading_time, cover_image, content
          ) VALUES (
            ${article.title}, ${article.slug}, ${article.excerpt}, ${article.category}, ${article.tags},
            ${article.publishedAt}, ${article.readingTime}, ${article.coverImage}, ${article.content}
          )
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            category = EXCLUDED.category,
            tags = EXCLUDED.tags,
            published_at = EXCLUDED.published_at,
            reading_time = EXCLUDED.reading_time,
            cover_image = EXCLUDED.cover_image,
            content = EXCLUDED.content,
            updated_at = NOW()
        `;
      }

      for (const item of playItems) {
        await tx`
          INSERT INTO play_items (
            title, slug, short_description, status, tags, date, cover_media, content
          ) VALUES (
            ${item.title}, ${item.slug}, ${item.shortDescription}, ${item.status}, ${item.tags}, ${item.date},
            ${item.coverMedia}, ${item.content ?? null}
          )
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            short_description = EXCLUDED.short_description,
            status = EXCLUDED.status,
            tags = EXCLUDED.tags,
            date = EXCLUDED.date,
            cover_media = EXCLUDED.cover_media,
            content = EXCLUDED.content,
            updated_at = NOW()
        `;
      }
    });

    return NextResponse.json({
      ok: true,
      seeded: {
        caseStudies: caseStudies.length,
        articles: articles.length,
        playItems: playItems.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Seed failed.",
        details: String(error)
      },
      { status: 500 }
    );
  }
}
