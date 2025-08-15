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
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-sm text-slate-600">Hola, {data?.user?.name}</p>
            <h1 className="text-2xl font-semibold">Tus tareas</h1>
            <p className="text-sm text-slate-600">Crea, marca como completadas, edita o elimina tus tareas.</p>
            <Tasks />
            <ReminderProvider />
            <ReminderSettingsCard />
        </section>
    );
}
