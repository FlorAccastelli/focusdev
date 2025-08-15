"use client";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        spotifySet?: (id: string) => void;
    }
}

export default function GlobalSpotifyPlayer() {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        window.spotifySet = (nextId: string) => {
            localStorage.setItem("spotify.playlist", nextId);
            window.dispatchEvent(new Event("spotify:set"));
        };

        setId(localStorage.getItem("spotify.playlist"));

        const onSet = () => setId(localStorage.getItem("spotify.playlist"));
        window.addEventListener("spotify:set", onSet);

        return () => {
            window.removeEventListener("spotify:set", onSet);
            // opcional: limpiar el setter
            // delete window.spotifySet;
        };
    }, []);

    if (!id) return null;

    return (
        <div className="fixed bottom-3 right-3 z-50 w-[320px] md:w-[380px]">
            <iframe
                src={`https://open.spotify.com/embed/playlist/${id}`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </div>
    );
}
