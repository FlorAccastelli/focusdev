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
                className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <header className="mb-6">
                    <h1 id="pomodoro-title" className="text-2xl font-bold">Pomodoro</h1>
                    <p className="mt-1 text-sm text-slate-600">Timer persistente entre secciones.</p>
                </header>

                <div className="flex flex-col items-center gap-6">
                    <div aria-live="polite" className="text-6xl font-extrabold tabular-nums tracking-tight">
                        {label}
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full">
                        <button
                            type="button"
                            className="col-span-2 rounded-xl px-4 py-2 text-base font-medium border border-slate-300 hover:bg-slate-50 active:scale-[0.99] transition"
                            onClick={startPause}
                        >
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        <button
                            type="button"
                            className="rounded-xl px-4 py-2 text-base font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition"
                            onClick={reset}
                            disabled={remainingSec === durationMin * 60 && !isRunning}
                            title="Resetear timer"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="w-full">
                        <label htmlFor="work-mins" className="block text-sm text-slate-600">
                            Duración (min)
                        </label>
                        <select
                            id="work-mins"
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
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
