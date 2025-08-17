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
            <body className="min-h-screen bg-white text-slate-900 antialiased">
                <Providers>
                    <header className="p-4 border-b border-slate-200 flex items-center gap-4">
                        <h1 className="text-lg font-bold mr-2">FocusDev</h1>

                        <nav className="flex gap-4">
                            <Link href="/" className="hover:underline">Home</Link>
                            <Link href="/pomodoro" className="hover:underline">Pomodoro</Link>
                            <Link href="/login" className="hover:underline">Login</Link>
                            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                            <Link href="/music" className="hover:underline">Música</Link>
                            <Link href="/contact" className="hover:underline">Contacto</Link>
                        </nav>

                        <div className="ml-auto">
                            <UserMenu />
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
