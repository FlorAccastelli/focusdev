"use client";

import { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinkClass = (href: string) =>
        `transition hover:text-blue-600 ${pathname === href ? "text-blue-600 font-semibold" : ""
        }`;

    return (
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">
                    <span className="text-blue-600">Focus</span>Dev
                </h1>

                <button
                    className="md:hidden px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsOpen(true)}
                >
                    ☰
                </button>

                <nav className="hidden md:flex gap-4 text-sm items-center">
                    <Link href="/" className={navLinkClass("/")}>Home</Link>
                    <Link href="/pomodoro" className={navLinkClass("/pomodoro")}>Pomodoro</Link>
                    <Link href="/music" className={navLinkClass("/music")}>Música</Link>
                    <Link href="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
                    <Link href="/contact" className={navLinkClass("/contact")}>Contacto</Link>

                </nav>

                <div className="hidden md:block">
                    <UserMenu />
                </div>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>

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

