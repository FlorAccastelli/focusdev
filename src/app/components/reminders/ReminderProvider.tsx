"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ensureNotificationPermission, notify } from "../../../../utils/notifications"; // ⬅️ nuevo

type ReminderKey = "hydration" | "posture";

const DEFAULTS = {
    masterEnabled: true,
    hydration: { enabled: true, everyMs: 5 * 60 * 1000 },
    posture: { enabled: true, everyMs: 2 * 60 * 1000 },
};

function readLS<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}
function writeLS<T>(key: string, value: T) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { }
}

function nextDelayFromLast(last: number | null, everyMs: number) {
    const now = Date.now();
    if (!last) return everyMs;
    const elapsed = now - last;
    const remaining = everyMs - (elapsed % everyMs);
    return Math.max(1000, remaining);
}

export default function ReminderProvider() {
    const [masterEnabled, setMasterEnabled] = useState<boolean>(true);
    const [hydrationEnabled, setHydrationEnabled] = useState<boolean>(true);
    const [postureEnabled, setPostureEnabled] = useState<boolean>(true);

    const timers = useRef<{ [K in ReminderKey]?: number }>({});
    const visibilityHandler = useRef<() => void | null>(null);

    useEffect(() => {
        setMasterEnabled(readLS("reminders.masterEnabled", DEFAULTS.masterEnabled));
        setHydrationEnabled(readLS("reminders.hydration.enabled", DEFAULTS.hydration.enabled));
        setPostureEnabled(readLS("reminders.posture.enabled", DEFAULTS.posture.enabled));
    }, []);

    useEffect(() => {
        if (masterEnabled && (hydrationEnabled || postureEnabled)) {
            ensureNotificationPermission();
        }
    }, [masterEnabled, hydrationEnabled, postureEnabled]);

    useEffect(() => { writeLS("reminders.masterEnabled", masterEnabled); }, [masterEnabled]);
    useEffect(() => { writeLS("reminders.hydration.enabled", hydrationEnabled); }, [hydrationEnabled]);
    useEffect(() => { writeLS("reminders.posture.enabled", postureEnabled); }, [postureEnabled]);

    useEffect(() => {
        function clearTimer(key: ReminderKey) {
            if (timers.current[key]) {
                window.clearTimeout(timers.current[key]);
                delete timers.current[key];
            }
        }

        async function fire(message: string, tag: string, icon?: string) {
            await notify(message, undefined, {
                tag,
                icon: icon ?? "/icons/health.png",
                requireInteraction: false,
                silent: false,
            });
            toast(message, { autoClose: 6000 });
        }

        function schedule(
            key: ReminderKey,
            everyMs: number,
            message: string,
            lsKeyLast: string,
            tag: string,
            icon?: string
        ) {
            const last = readLS<number | null>(lsKeyLast, null);
            const delay = nextDelayFromLast(last, everyMs);
            timers.current[key] = window.setTimeout(function tick() {
                if (!masterEnabled) return;
                if (key === "hydration" && !hydrationEnabled) return;
                if (key === "posture" && !postureEnabled) return;

                fire(message, tag, icon);
                writeLS(lsKeyLast, Date.now());
                timers.current[key] = window.setTimeout(tick, everyMs);
            }, delay);
        }

        clearTimer("hydration");
        clearTimer("posture");

        if (masterEnabled) {
            if (hydrationEnabled) {
                schedule(
                    "hydration",
                    DEFAULTS.hydration.everyMs,
                    "💧 Tomá 1 vaso de agua",
                    "reminders.hydration.last",
                    "hydration",
                    "/icons/water.png"
                );
            }
            if (postureEnabled) {
                schedule(
                    "posture",
                    DEFAULTS.posture.everyMs,
                    "🧘 Revisá tu postura: alargá la espalda y relajá hombros",
                    "reminders.posture.last",
                    "posture",
                    "/icons/posture.png"
                );
            }
        }

        function onVisibilityChange() {
            if (document.hidden) {
                clearTimer("hydration");
                clearTimer("posture");
            } else {
                setMasterEnabled((v) => v);
            }
        }
        document.addEventListener("visibilitychange", onVisibilityChange);
        visibilityHandler.current = onVisibilityChange;

        return () => {
            clearTimer("hydration");
            clearTimer("posture");
            if (visibilityHandler.current) {
                document.removeEventListener("visibilitychange", visibilityHandler.current);
            }
        };
    }, [masterEnabled, hydrationEnabled, postureEnabled]);
    return null;
}
