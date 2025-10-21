"use client";

import formatTime from "../../../utils/formatTime";
import { usePomodoro } from "../../context/PomodoroContext";

export default function PomodoroPage() {
    const {
        durationMin,
        remainingSec,
        isRunning,
        setDurationMin,
        startPause,
        reset,
    } = usePomodoro();

    const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const mins = Number(e.currentTarget.value);
        setDurationMin(mins);
    };

    const label = formatTime(remainingSec);

    return (
        <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-6">
            <section
                aria-labelledby="pomodoro-title"
                className="w-full max-w-md rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md p-6 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800"
            >
                <header className="mb-6 space-y-1 text-center">
                    <h1 id="pomodoro-title" className="text-3xl font-bold">Pomodoro</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Técnica para mejorar tu productividad mediante ciclos de foco y descanso. El timer se mantiene aunque cambies de sección.
                    </p>
                </header>

                <div className="flex flex-col items-center gap-6">
                    <div aria-live="polite" className="text-6xl font-extrabold tabular-nums tracking-tight">
                        {label}
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full">
                        <button
                            type="button"
                            onClick={startPause}
                            className="col-span-2 rounded-xl px-4 py-2 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isRunning ? "Pausar" : "Iniciar"}
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            disabled={remainingSec === durationMin * 60 && !isRunning}
                            title="Resetear timer"
                            className="rounded-xl px-4 py-2 text-base font-medium border border-slate-300 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="w-full">
                        <label htmlFor="work-mins" className="block text-sm text-slate-600 dark:text-slate-400">
                            Duración (min)
                        </label>
                        <select
                            id="work-mins"
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                            value={durationMin}
                            onChange={handleSelectChange}
                            disabled={isRunning}
                        >
                            <option value={1}>1</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                        </select>
                    </div>
                </div>
            </section>
        </main>
    );
}
