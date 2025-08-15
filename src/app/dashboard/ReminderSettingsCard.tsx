"use client";
import { useEffect, useState } from "react";

export default function ReminderSettingsCard() {
    const [master, setMaster] = useState(true);
    const [hydration, setHydration] = useState(true);
    const [posture, setPosture] = useState(true);

    useEffect(() => {
        setMaster(JSON.parse(localStorage.getItem("reminders.masterEnabled") ?? "true"));
        setHydration(JSON.parse(localStorage.getItem("reminders.hydration.enabled") ?? "true"));
        setPosture(JSON.parse(localStorage.getItem("reminders.posture.enabled") ?? "true"));
    }, []);

    useEffect(() => { localStorage.setItem("reminders.masterEnabled", JSON.stringify(master)); }, [master]);
    useEffect(() => { localStorage.setItem("reminders.hydration.enabled", JSON.stringify(hydration)); }, [hydration]);
    useEffect(() => { localStorage.setItem("reminders.posture.enabled", JSON.stringify(posture)); }, [posture]);

    return (
        <div className="border rounded-2xl p-4 space-y-4">
            <h3 className="text-lg font-semibold">Recordatorios</h3>
            <p className="text-sm text-gray-600">
                Mostramos toasts predefinidos: Hidratación (cada 2h) y Postura (cada 1h). No se pueden crear recordatorios personalizados.
            </p>
            <label className="flex items-center gap-2">
                <input type="checkbox" checked={master} onChange={e => setMaster(e.target.checked)} />
                Activar recordatorios
            </label>
            <div className="grid gap-2 md:grid-cols-2">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={hydration} onChange={e => setHydration(e.target.checked)} disabled={!master} />
                    Hidratación (cada 2h)
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={posture} onChange={e => setPosture(e.target.checked)} disabled={!master} />
                    Postura (cada 1h)
                </label>
            </div>
        </div>
    );
}
