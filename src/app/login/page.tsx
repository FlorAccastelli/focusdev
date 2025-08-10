"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogle = async () => {
        try {
            setLoading(true);
            await signIn("google", { callbackUrl: "/" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-6">
            <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <header className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Sign in</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Usa tu cuenta de Google para continuar
                    </p>
                </header>

                <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full rounded-xl px-4 py-2 text-base font-medium border border-slate-300 hover:bg-slate-50 active:scale-[0.99] transition disabled:opacity-60"
                >
                    {loading ? "Redirigiendo..." : "Loguearse con google"}
                </button>
            </section>
        </main>
    );
}
