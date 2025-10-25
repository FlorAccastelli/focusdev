"use client";

import { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">
                    <span className="text-blue-600">Focus</span>Dev
                </h1>

                {/* Botón hamburguesa */}
                <button
                    className="md:hidden px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsOpen(true)}
                >
                    ☰
                </button>

                {/* Menú horizontal (solo en desktop) */}
                <nav className="hidden md:flex gap-4 text-sm items-center">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/pomodoro" className="hover:text-blue-600">Pomodoro</Link>
                    <Link href="/music" className="hover:text-blue-600">Música</Link>
                    <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                    <Link href="/contact" className="hover:text-blue-600">Contacto</Link>
                </nav>

                {/* UserMenu en desktop */}
                <div className="hidden md:block">
                    <UserMenu />
                </div>
            </div>

            {/* Overlay + drawer mobile */}
            {isOpen && (
                <>
                    {/* Fondo oscuro */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Drawer */}
                    <aside className="fixed top-0 right-0 h-screen w-64 bg-white dark:bg-slate-900 p-6 z-50 shadow-2xl transition-transform duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Menú</h2>
                            <button
                                className="text-2xl font-bold focus:outline-none"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="flex flex-col gap-3 text-sm">
                            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link href="/pomodoro" onClick={() => setIsOpen(false)}>Pomodoro</Link>
                            <Link href="/music" onClick={() => setIsOpen(false)}>Música</Link>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)}>Contacto</Link>
                        </nav>

                        <div className="mt-6 border-t pt-4 border-slate-200 dark:border-slate-700">
                            <UserMenu />
                        </div>
                    </aside>
                </>
            )}
        </header>
    );
}

