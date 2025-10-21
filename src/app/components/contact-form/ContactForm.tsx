"use client";
import { useEffect, useMemo, useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
    const [err, setErr] = useState<string>("");
    const [t, setT] = useState<number>(0); // timestamp para anti-spam

    useEffect(() => setT(Date.now()), []);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        setErr("");

        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as any;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    company: data.company,
                    t,
                }),
            });
            const j = await res.json();
            if (!res.ok) throw new Error(j?.error || "Error");
            setStatus("ok");
            form.reset();
            setT(Date.now());
        } catch (e: any) {
            setErr(e.message || "Error");
            setStatus("error");
        }
    }

    const disabled = useMemo(() => status === "sending", [status]);

    return (
        <form onSubmit={onSubmit} className="space-y-3 max-w-lg">
            <div className="grid gap-2">
                <label className="text-sm font-medium">Nombre</label>
                <input name="name" required className="rounded border px-3 py-2" />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" required className="rounded border px-3 py-2" />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-medium">Mensaje</label>
                <textarea name="message" required rows={5} className="rounded border px-3 py-2" />
            </div>

            <div className="hidden">
                <label>Company</label>
                <input name="company" />
            </div>

            <button
                type="submit"
                disabled={disabled}
                className="px-4 py-2 rounded border hover:bg-slate-50 hover:text-slate-700 disabled:opacity-60"
            >
                {status === "sending" ? "Enviando…" : "Enviar"}
            </button>

            {status === "ok" && (
                <p className="text-green-600 text-sm">¡Mensaje enviado! Te responderé pronto.</p>
            )}
            {status === "error" && (
                <p className="text-red-600 text-sm">No se pudo enviar: {err}</p>
            )}
        </form>
    );
}
