import MusicSearch from "./search";

export const dynamic = "force-dynamic";

const CURATED = [
    "37i9dQZF1DX8Uebhn9wzrS",
    "37i9dQZF1DX4sWSpwq3LiO",
    "37i9dQZF1DWZeKCadgRdKQ",
    "37i9dQZF1DXc8kgYqQLMfH",
];

export default async function MusicPage() {
    return (
        <main className="max-w-5xl mx-auto p-6 space-y-8">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold">Música para concentrarte</h1>
                <p className="text-slate-600">
                    Esta sección es pública. Buscá playlists o probá las sugeridas.
                </p>
            </header>

            <MusicSearch />

            <section className="space-y-3">
                <h2 className="text-lg font-medium">Sugeridas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CURATED.map((id) => (
                        <iframe
                            key={id}
                            className="w-full rounded-lg"
                            src={`https://open.spotify.com/embed/playlist/${id}`}
                            height="352"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
