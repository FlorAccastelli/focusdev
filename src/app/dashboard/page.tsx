"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
        </section>
    );
}
