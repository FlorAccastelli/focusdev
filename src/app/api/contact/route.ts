export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  message: string;
  company?: string;
  t?: number;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Payload;

    // Anti-spam
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }
    const now = Date.now();
    const minDelayMs = 3000;
    if (!data.t || now - data.t < minDelayMs) {
      return NextResponse.json({ error: "Too fast" }, { status: 400 });
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || "no-reply@vercel.app";

    if (!apiKey || !to) {
      console.warn("Contact envs faltantes, imprimiendo en consola:");
      console.info({ name, email, message });
      return NextResponse.json({ ok: true });
    }

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Nuevo contacto: ${name}`,
        reply_to: email,
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("Resend error:", txt);
      return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/contact error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
