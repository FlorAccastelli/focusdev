"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // 🔁 Redirigir si ya está logueado
    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [status, router]);

    const handleGoogle = async () => {
        try {
            setLoading(true);
            await signIn("google", { callbackUrl: "/dashboard" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-6">
            {status === "unauthenticated" && (
                <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <header className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-slate-500">Sign in</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Usa tu cuenta de Google para continuar
                        </p>
                    </header>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={loading}
                        className="w-full bg-blue-800 rounded-xl px-4 py-2 text-slate-50 font-medium border border-slate-300 hover:bg-blue-950 active:scale-[0.99] transition disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? "Redirigiendo..." : "Loguearse con Google"}
                    </button>
                </section>
            )}
        </main>
    );
}
