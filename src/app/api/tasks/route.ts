export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { tasksCol } from "./collection";
import { TaskSchema } from "../../../types/task";
// import { auth } from "@/auth"; // si usás next-auth

function escapeRegex(s: string) {
  // escapa caracteres especiales para regex
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: Request) {
  // const session = await auth();
  // const userId = session?.user?.email ?? null;
  const userId = null; // cámbialo cuando conectes auth
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  const col = await tasksCol();

  const filter: any = { userId };
  if (q) {
    const rx = `^${escapeRegex(q)}`; // prefijo -> usa índice { title: 1 }
    filter.title = { $regex: rx, $options: "i" };
  }

  const items = await col.find(filter).sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  // const session = await auth();
  // const userId = session?.user?.email ?? null;
  const userId = null;
  const body = await req.json();
  const now = Date.now();

  const parsed = TaskSchema.omit({ _id: true }).safeParse({
    userId,
    title: body?.title,
    done: false,
    createdAt: now,
    updatedAt: now,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const col = await tasksCol();
  const { insertedId } = await col.insertOne(parsed.data);
  return NextResponse.json({ _id: insertedId, ...parsed.data }, { status: 201 });
}

