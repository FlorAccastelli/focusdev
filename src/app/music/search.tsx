"use client";

import { useState, useEffect } from "react";

type Image = { url: string };
type ExternalUrls = { spotify?: string };
type Playlist = { id?: string; name?: string; images?: Image[]; external_urls?: ExternalUrls };

export default function MusicSearch() {
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Playlist[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (q.trim() === "") {
            setItems([]);
            setHasSearched(false);
        }
    }, [q]);



    async function onSearch(e: React.FormEvent) {
        e.preventDefault();
        const query = q.trim();
        if (!query) {
            setHasSearched(false);
            return;
        }

        setLoading(true);
        setHasSearched(true);

        try {
            const res = await fetch(
                `/api/spotify/search?q=${encodeURIComponent(query)}&type=playlist&limit=12`,
                { cache: "no-store" }
            );
            const json = await res.json();
            const found: Playlist[] = (json?.playlists?.items ?? []).filter(Boolean);
            setItems(found);
        } finally {
            setLoading(false);
        }
    }


    return (
        <section className="space-y-6">
            <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar playlists (ej. lo-fi, focus, coding)"
                    className="flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    disabled={loading || !q.trim()}
                    className="px-4 py-2 rounded border border-slate-300 text-sm  hover:bg-slate-50 hover:text-slate-700 disabled:opacity-60 cursor-pointer"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            {items.length > 0 && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((p) => {
                        if (!p) return null;

                        const img = p?.images?.[0]?.url ?? "https://via.placeholder.com/64";
                        const name = p?.name ?? "Playlist";
                        const ext = p?.external_urls?.spotify;
                        const id = p?.id ?? `${name}-${img}`;

                        return (
                            <li key={id} className="space-y-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img}
                                        alt={name}
                                        loading="lazy"
                                        className="h-10 w-10 rounded object-cover shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-medium truncate">{name}</p>
                                        {ext && (
                                            <a
                                                href={ext}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs underline hover:opacity-80 text-slate-600"
                                            >
                                                Abrir en Spotify
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {p?.id && (
                                    <div className="w-full overflow-hidden rounded-lg aspect-[4/3]">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://open.spotify.com/embed/playlist/${p.id}`}
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            {hasSearched && items.length === 0 && !loading && (
                <p className="text-sm text-muted-foreground">
                    Sin resultados para “{q.trim()}”.
                </p>
            )}

        </section>
    );
}
