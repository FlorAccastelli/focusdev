import { NextResponse } from "next/server";
import { getAppAccessToken } from "../../../../lib/spotify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "focus";
  const type = searchParams.get("type") || "playlist";
  const limit = searchParams.get("limit") || "12";

  const token = await getAppAccessToken();
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.set("q", q);
  url.searchParams.set("type", type);
  url.searchParams.set("limit", limit);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
