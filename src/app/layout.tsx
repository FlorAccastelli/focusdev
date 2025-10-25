import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import ReminderProvider from "./components/reminders/ReminderProvider";
import { PomodoroProvider } from "context/PomodoroContext";
import Footer from "./components/footer/Footer";
import Header from "./components/Header";

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
            <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
                <Providers>
                    <ReminderProvider>
                        <PomodoroProvider>
                            <Header />
                            <main id="main">{children}</main>
                            <Footer />
                        </PomodoroProvider>
                    </ReminderProvider>
                </Providers>
            </body>
        </html>
    );
}



