import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const company = String(formData.get("company") ?? "");
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
