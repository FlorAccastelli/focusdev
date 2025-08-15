"use client";

import { useEffect, useMemo, useState } from "react";

type Task = {
    _id: string;
    title: string;
    done: boolean;
    createdAt: number;
    updatedAt: number;
};

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "done">("all");
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchTasks(query?: string) {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks${query ? `?q=${encodeURIComponent(query)}` : ""}`, { cache: "no-store" });
            const json = await res.json();
            setTasks(json.items ?? []);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTasks(); }, []);

    const filtered = useMemo(() => {
        if (filter === "active") return tasks.filter(t => !t.done);
        if (filter === "done") return tasks.filter(t => t.done);
        return tasks;
    }, [tasks, filter]);

    async function addTask(e: React.FormEvent) {
        e.preventDefault();
        const t = title.trim();
        if (!t) return;
        const res = await fetch("/api/tasks", { method: "POST", body: JSON.stringify({ title: t }) });
        const created = await res.json();
        setTasks(prev => [created, ...prev]);
        setTitle("");
    }

    async function toggleTask(id: string, done: boolean) {
        const res = await fetch(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ done: !done }) });
        const updated = await res.json();
        setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
    }

    async function renameTask(id: string, nextTitle: string) {
        const res = await fetch(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ title: nextTitle }) });
        const updated = await res.json();
        setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
    }

    async function deleteTask(id: string) {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        setTasks(prev => prev.filter(t => t._id !== id));
    }

    return (
        <div className="space-y-4">
            <form onSubmit={addTask} className="flex gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nueva tarea…"
                    className="flex-1 rounded border border-slate-300 px-3 py-2"
                />
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-60"
                >
                    Agregar
                </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-lg border overflow-hidden">
                    {(["all", "active", "done"] as const).map(k => (
                        <button
                            key={k}
                            onClick={() => setFilter(k)}
                            className={`px-3 py-1 text-sm ${filter === k ? "bg-slate-100" : "hover:bg-slate-50"}`}
                        >
                            {k === "all" ? "Todas" : k === "active" ? "Activas" : "Completadas"}
                        </button>
                    ))}
                </div>
                <form
                    onSubmit={(e) => { e.preventDefault(); fetchTasks(q.trim()); }}
                    className="ml-auto flex gap-2"
                >
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Buscar por título…"
                        className="rounded border border-slate-300 px-3 py-1.5"
                    />
                    <button className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50">
                        Buscar
                    </button>
                </form>
            </div>

            <ul className="divide-y rounded border">
                {filtered.map(t => (
                    <li key={t._id} className="flex items-center gap-3 px-3 py-2">
                        <input
                            type="checkbox"
                            checked={t.done}
                            onChange={() => toggleTask(t._id, t.done)}
                            className="h-4 w-4"
                        />
                        <input
                            defaultValue={t.title}
                            onBlur={(e) => {
                                const val = e.currentTarget.value.trim();
                                if (val && val !== t.title) renameTask(t._id, val);
                                else e.currentTarget.value = t.title; // rollback visual
                            }}
                            className={`flex-1 bg-transparent outline-none ${t.done ? "line-through text-slate-400" : ""}`}
                        />
                        <button
                            onClick={() => deleteTask(t._id)}
                            className="text-sm text-red-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
                {filtered.length === 0 && (
                    <li className="px-3 py-6 text-sm text-slate-500">{loading ? "Cargando…" : "No hay tareas."}</li>
                )}
            </ul>
        </div>
    );
}
