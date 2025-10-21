import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import UserMenu from "./components/UserMenu";
import Providers from "./providers";
import ReminderProvider from "./components/reminders/ReminderProvider";
import { PomodoroProvider } from "context/PomodoroContext";
import Footer from "./components/footer/Footer";

export const metadata: Metadata = {
    title: "FocusDev",
    description: "Productivity and wellness platform for developers",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
                <Providers>
                    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
                        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
                            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 rounded-md px-3 py-1 bg-amber-500 text-white">
                                Saltar al contenido
                            </a>

                            <h1 className="text-xl font-bold tracking-tight">
                                <span className="text-blue-600">Focus</span>Dev
                            </h1>

                            <nav aria-label="Principal" className="flex gap-3 text-sm">
                                <Link href="/" className="px-2 py-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800">Home</Link>
                                <Link href="/pomodoro" className="px-2 py-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800">Pomodoro</Link>
                                <Link href="/music" className="px-2 py-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800">Música</Link>
                                <Link href="/dashboard" className="px-2 py-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800">Dashboard</Link>
                                <Link href="/contact" className="px-2 py-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800">Contacto</Link>
                            </nav>

                            <div className="ml-auto">
                                <UserMenu />
                            </div>
                        </div>
                    </header>

                    <PomodoroProvider>
                        <main className="container mx-auto p-4">{children}</main>
                        <ReminderProvider />
                        <Footer />
                    </PomodoroProvider>
                </Providers>
            </body>
        </html>
    );
}
