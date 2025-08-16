export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { tasksCol } from "../collection";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function PATCH(req: NextRequest, ctx: any) {
  const { params } = ctx as { params: { id: string } };

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.user?.email ?? null;

  const { id } = params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const body = await req.json();
  const col = await tasksCol();

  const update: { $set: { updatedAt: number; title?: string; done?: boolean } } = {
    $set: { updatedAt: Date.now() },
  };
  if (typeof body.title === "string" && body.title.trim()) update.$set.title = body.title.trim();
  if (typeof body.done === "boolean") update.$set.done = body.done;

  const res = await col.findOneAndUpdate(
    { _id: new ObjectId(id), userId },
    update,
    { returnDocument: "after" }
  );
  if (!res) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(res);
}

export async function DELETE(_req: NextRequest, ctx: any) {
  const { params } = ctx as { params: { id: string } };

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.user?.email ?? null;

  const { id } = params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const col = await tasksCol();
  const res = await col.deleteOne({ _id: new ObjectId(id), userId });
  if (!res.deletedCount) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
