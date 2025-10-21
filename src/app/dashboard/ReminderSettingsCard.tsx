"use client";

import { useEffect, useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import { BellIcon } from "@heroicons/react/24/solid";

export default function ReminderSettingsCard() {
    const [master, setMaster] = useState(true);
    const [hydration, setHydration] = useState(true);
    const [posture, setPosture] = useState(true);

    useEffect(() => {
        setMaster(JSON.parse(localStorage.getItem("reminders.masterEnabled") ?? "true"));
        setHydration(JSON.parse(localStorage.getItem("reminders.hydration.enabled") ?? "true"));
        setPosture(JSON.parse(localStorage.getItem("reminders.posture.enabled") ?? "true"));
    }, []);

    useEffect(() => {
        localStorage.setItem("reminders.masterEnabled", JSON.stringify(master));
    }, [master]);
    useEffect(() => {
        localStorage.setItem("reminders.hydration.enabled", JSON.stringify(hydration));
    }, [hydration]);
    useEffect(() => {
        localStorage.setItem("reminders.posture.enabled", JSON.stringify(posture));
    }, [posture]);

    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-white/5">
            <div className="flex items-center gap-2 font-medium text-sm">
                <BellIcon className="h-5 w-5 text-blue-500" />
                Recordatorios
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
                <ToggleSwitch
                    enabled={hydration}
                    setEnabled={setHydration}
                    label="Hidratación (cada 2h)"
                />
                <ToggleSwitch
                    enabled={posture}
                    setEnabled={setPosture}
                    label="Postura (cada 1h)"
                />
            </div>
        </div>
    );
}
