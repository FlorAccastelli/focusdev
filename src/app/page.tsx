export default function HomePage() {
    return (
        <main id="main" className="relative isolate">
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
            />

            <section className="mx-auto max-w-6xl px-6 py-24 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                    Bienvenido a <span className="text-blue-600">FocusDev</span>
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300">
                    Plataforma para mejorar tu concentración y bienestar como desarrollador. Pomodoro, recordatorios, tareas y música en un solo lugar.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <a
                        href="/pomodoro"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
                    >
                        Empezar ahora
                    </a>
                    <a
                        href="/music"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                        Explorar música
                    </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="rounded-full border px-3 py-1">Sincronizado con Spotify</span>
                    <span className="rounded-full border px-3 py-1">Accesible y responsivo</span>
                    <span className="rounded-full border px-3 py-1">Modo oscuro</span>
                </div>
            </section>
        </main>
    );
}





