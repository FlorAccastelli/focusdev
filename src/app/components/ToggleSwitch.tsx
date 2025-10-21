"use client";

import { Switch } from "@headlessui/react";

type Props = {
    enabled: boolean;
    setEnabled: (value: boolean) => void;
    label?: string;
};

export default function ToggleSwitch({ enabled, setEnabled, label }: Props) {
    return (
        <Switch.Group as="div" className="flex items-center gap-2">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? "bg-blue-600" : "bg-slate-400"} 
          relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
            ${enabled ? "translate-x-6" : "translate-x-1"}`}
                />
            </Switch>
            {label && <Switch.Label className="text-sm">{label}</Switch.Label>}
        </Switch.Group>
    );
}
