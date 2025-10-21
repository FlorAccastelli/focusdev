"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function UserMenu() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <button
                onClick={() => signIn("google")}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
            >
                Sign in with Google
            </button>
        );
    }

    const firstName = session.user?.name?.split(" ")[0] ?? "dev";

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-slate-700">Hola, {firstName} 👋</span>
            <button
                onClick={() => signOut()}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50 hover:text-slate-700 "
            >
                Cerrar sesión
            </button>
        </div>
    );
}

