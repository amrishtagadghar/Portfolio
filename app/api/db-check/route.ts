import { NextResponse } from "next/server";
import { hasDatabase, sql } from "@/lib/db";

export async function GET() {
  if (!hasDatabase || !sql) {
    return NextResponse.json(
      { ok: false, message: "POSTGRES_URL is not set. Add Neon env vars in Vercel and local .env.local." },
      { status: 500 }
    );
  }

  try {
    const result = await sql<{ now: string }[]>`SELECT NOW()::text AS now`;
    return NextResponse.json({ ok: true, now: result[0]?.now ?? null });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Database connection failed.", error: String(error) }, { status: 500 });
  }
}
