"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Tasks from "app/components/tasks/Tasks";
import ReminderProvider from "app/components/reminders/ReminderProvider";
import ReminderSettingsCard from "./ReminderSettingsCard";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
    const { status, data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/login");
    }, [status, router]);

    if (status !== "authenticated") return null;

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <section className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Bienvenida, {data?.user?.name?.split(" ")[0] ?? "usuario"} 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Este es tu espacio personal para organizar tus tareas y cuidar tu bienestar.
                </p>
            </section>

            <section className="space-y-4">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold text-white">Tus tareas</h2>
                    <p className="text-sm text-slate-200/80">
                        Crea, marca como completadas, edita o elimina tus tareas.
                    </p>
                </header>
                <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg ring-1 ring-slate-700/30">
                    <Tasks />
                </div>
            </section>

            <section className="space-y-4">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold text-white">Recordatorios</h2>
                    <p className="text-sm text-slate-200/80">
                        Activá los recordatorios automáticos para mantener buenos hábitos mientras trabajás.
                    </p>
                </header>
                <ReminderProvider>
                    <ReminderSettingsCard />
                </ReminderProvider>
            </section>

        </main>
    );
}

