export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-4">
                Bienvenido a <span className="text-purple-600">FocusDev</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
                Una plataforma para mejorar tu concentración y bienestar como desarrollador 🚀
            </p>
            <a
                href="/pomodoro"
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
                Empezar ahora
            </a>
        </main>
    );
}

