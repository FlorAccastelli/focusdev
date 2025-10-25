"use client";

import { useEffect, useMemo, useState } from "react";
import ToggleSwitch from "../ToggleSwitch"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

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
            const res = await fetch(`/api/tasks${query ? `?q=${encodeURIComponent(query)}` : ""}`, {
                cache: "no-store",
            });
            const json = await res.json();
            setTasks(json.items ?? []);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTasks(); }, []);

    const filtered = useMemo(() => {
        if (filter === "active") return tasks.filter((t) => !t.done);
        if (filter === "done") return tasks.filter((t) => t.done);
        return tasks;
    }, [tasks, filter, q]);

    async function addTask(e: React.FormEvent) {
        e.preventDefault();
        const t = title.trim();
        if (!t) return;
        const res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify({ title: t }),
        });
        const created = await res.json();
        setTasks((prev) => [created, ...prev]);
        setTitle("");
    }

    async function toggleTask(id: string, done: boolean) {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ done: !done }),
        });
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    }

    async function renameTask(id: string, nextTitle: string) {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ title: nextTitle }),
        });
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    }

    async function deleteTask(id: string) {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        setTasks((prev) => prev.filter((t) => t._id !== id));
    }

    return (
        <section className="space-y-4">
            {/* Add task */}
            <form onSubmit={addTask} className="flex gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nueva tarea…"
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white"
                    title="Agregar tarea"
                >
                    <PlusIcon className="h-5 w-5" />
                </button>
            </form>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-lg border overflow-hidden">
                    {(["all", "active", "done"] as const).map((k) => (
                        <button
                            key={k}
                            onClick={() => setFilter(k)}
                            className={`px-3 py-1 text-sm ${filter === k
                                ? "bg-blue-600 text-white"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                        >
                            {k === "all" ? "Todas" : k === "active" ? "Activas" : "Completadas"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task list */}
            <ul className="space-y-2">
                {filtered.map((t) => (
                    <li key={t._id} className="group flex items-center justify-between bg-slate-800/40 rounded-xl px-4 py-3 mb-2 shadow hover:bg-slate-800 transition">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleTask(t._id, t.done)}
                                className={`h-5 w-5 rounded-full border-2 ${t.done ? "bg-blue-500 border-blue-500" : "border-slate-400"} flex items-center justify-center`}
                                aria-label={t.done ? "Marcar como pendiente" : "Marcar como completada"}
                            >
                                {t.done && <span className="text-white text-xs">✓</span>}
                            </button>

                            <input
                                defaultValue={t.title}
                                onBlur={(e) => {
                                    const val = e.currentTarget.value.trim();
                                    if (val && val !== t.title) renameTask(t._id, val);
                                    else e.currentTarget.value = t.title;
                                }}
                                className={`bg-transparent outline-none text-sm md:text-base ${t.done ? "line-through text-slate-400" : "text-slate-100"}`}
                            />
                        </div>

                        <button
                            onClick={() => deleteTask(t._id)}
                            className="text-red-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition cursor-pointer"
                            aria-label="Eliminar tarea"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </li>

                ))}
                {filtered.length === 0 && (
                    <li className="text-sm text-slate-500 px-3 py-6">
                        {loading ? "Cargando…" : "No hay tareas."}
                    </li>
                )}
            </ul>
        </section>
    );
}

