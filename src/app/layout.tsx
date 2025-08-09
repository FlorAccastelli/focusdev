import type { Metadata } from "next";
import "./globals.css";

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
                {/* TODO: Replace with Header component */}
                <header className="p-4 border-b border-slate-200">
                    <h1 className="text-lg font-bold">FocusDev</h1>
                </header>

                <main className="container mx-auto p-4">{children}</main>
            </body>
        </html>
    );
}
