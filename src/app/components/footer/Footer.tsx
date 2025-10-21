export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-6">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 dark:text-slate-400 space-y-1">
                <p>
                    Hecho con <span className="text-red-500">❤</span> por{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-100">
                        Florencia Accastelli
                    </span>
                </p>
                <p>Proyecto Final · FICH · UNL</p>
                <p className="text-xs">
                    FocusDev v1.0 —{" "}
                    <a
                        href="https://vercel.com/docs"
                        className="hover:underline text-blue-600 dark:text-blue-400"
                        target="_blank" rel="noopener noreferrer"
                    >
                        Deploy en Vercel
                    </a>{" "}
                    · Código abierto
                </p>
            </div>
        </footer>
    );
}

