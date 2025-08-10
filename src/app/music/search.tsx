"use client";

import { useState } from "react";

type Image = { url: string };
type ExternalUrls = { spotify?: string };
type Playlist = { id: string; name: string; images?: Image[]; external_urls?: ExternalUrls };

export default function MusicSearch() {
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Playlist[]>([]);

    console.log("items", items)

    async function onSearch(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}&type=playlist&limit=12`, {
                cache: "no-store",
            });
            const json = await res.json();
            const found: Playlist[] = json?.playlists?.items ?? [];
            setItems(found);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="space-y-4">
            <form onSubmit={onSearch} className="flex gap-2">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar playlists (ej. lo-fi, focus, coding)"
                    className="flex-1 rounded border border-slate-300 px-3 py-2"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-60"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            {items.length > 0 && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((p) => (
                        <li key={p.id} className="border rounded-lg p-3 space-y-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={p.images?.[0]?.url ?? "https://via.placeholder.com/300"}
                                alt={p.name}
                                className="w-full h-40 object-cover rounded"
                            />
                            <p className="font-medium">{p.name}</p>
                            {p.external_urls?.spotify && (
                                <a
                                    href={p.external_urls.spotify}
                                    target="_blank"
                                    className="text-sm underline hover:opacity-80"
                                >
                                    Abrir en Spotify
                                </a>
                            )}
                            <iframe
                                className="w-full rounded"
                                src={`https://open.spotify.com/embed/playlist/${p.id}`}
                                height="80"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
