"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ensureNotificationPermission, notify } from "../../utils/notifications";
import { playBell, primeBell } from "../../utils/sound";

type PomodoroCtx = {
    durationMin: number;
    remainingSec: number;
    isRunning: boolean;
    setDurationMin: (m: number) => void;
    startPause: () => Promise<void>;
    reset: () => void;
};

const Ctx = createContext<PomodoroCtx | null>(null);

const now = () => Date.now();
const clampSec = (msLeft: number) => Math.max(0, Math.ceil(msLeft / 1000));

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
    const [durationMin, setDurationMin] = useState(25);
    const [isRunning, setIsRunning] = useState(false);
    const [endAt, setEndAt] = useState<number | null>(null);
    const [remainingSec, setRemainingSec] = useState(25 * 60);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        try {
            const sd = localStorage.getItem("pomodoro.durationMin");
            const si = localStorage.getItem("pomodoro.isRunning");
            const se = localStorage.getItem("pomodoro.endAt");

            if (sd) setDurationMin(Number(sd));
            if (si) setIsRunning(si === "true");
            if (se) setEndAt(Number(se));

            const end = se ? Number(se) : null;
            if (si === "true" && end) {
                const left = clampSec(end - now());
                setRemainingSec(left > 0 ? left : 0);
                if (left <= 0) {
                    setIsRunning(false);
                    setEndAt(null);
                }
            } else {
                setRemainingSec((sd ? Number(sd) : 25) * 60);
            }
        } catch {/* no-op */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem("pomodoro.durationMin", String(durationMin));
    }, [durationMin]);

    useEffect(() => {
        localStorage.setItem("pomodoro.isRunning", String(isRunning));
    }, [isRunning]);

    useEffect(() => {
        if (endAt == null) localStorage.removeItem("pomodoro.endAt");
        else localStorage.setItem("pomodoro.endAt", String(endAt));
    }, [endAt]);

    useEffect(() => {
        if (!isRunning || endAt == null) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }
        intervalRef.current = window.setInterval(() => {
            const left = clampSec(endAt - now());
            if (left <= 0) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                setIsRunning(false);
                setEndAt(null);
                setRemainingSec(0);
                playBell();
                notify("¡Pomodoro terminado!", "Tomate un descanso 🙂", { requireInteraction: true });
            } else {
                setRemainingSec(left);
            }
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, endAt]);

    useEffect(() => {
        const onVis = () => {
            if (isRunning && endAt != null) {
                setRemainingSec(clampSec(endAt - now()));
            }
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [isRunning, endAt]);

    const startPause = async () => {
        if (!isRunning) {
            const base = remainingSec === 0 ? durationMin * 60 : remainingSec;
            await ensureNotificationPermission();
            await primeBell();
            setEndAt(now() + base * 1000);
            setRemainingSec(base);
            setIsRunning(true);
        } else {
            const left = endAt ? clampSec(endAt - now()) : remainingSec;
            setRemainingSec(left);
            setIsRunning(false);
            setEndAt(null);
        }
    };

    const reset = () => {
        setIsRunning(false);
        setEndAt(null);
        setRemainingSec(durationMin * 60);
    };

    const value = useMemo<PomodoroCtx>(() => ({
        durationMin,
        remainingSec,
        isRunning,
        setDurationMin: (m: number) => {
            setDurationMin(m);
            if (isRunning && endAt) {
                const left = clampSec(endAt - now());
                const next = Math.max(left, 0);
                const target = Math.max(m * 60, next);
                setEndAt(now() + target * 1000);
                setRemainingSec(target);
            } else {
                setRemainingSec(m * 60);
            }
        },
        startPause,
        reset
    }), [durationMin, remainingSec, isRunning, endAt]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePomodoro() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("usePomodoro debe usarse dentro de <PomodoroProvider>");
    return ctx;
}
