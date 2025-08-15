export async function ensureNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;

  // secure context: https or localhost
  const isSecure = window.isSecureContext || location.hostname === "localhost";
  if (!isSecure) return false;

  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  // 'default' -> pedir permiso (ideal: desde gesto del usuario)
  const res = await Notification.requestPermission();
  return res === "granted";
}

type NotifyOpts = {
  body?: string;
  icon?: string;
  requireInteraction?: boolean;
  tag?: string;
  silent?: boolean;
  data?: any;
};

function blinkTitle(msg: string, durationMs = 6000) {
  if (typeof document === "undefined") return;
  const original = document.title;
  let on = true;
  const id = window.setInterval(() => {
    document.title = on ? `🔔 ${msg}` : original;
    on = !on;
  }, 800);
  window.setTimeout(() => {
    clearInterval(id);
    document.title = original;
  }, durationMs);
}

export async function notify(title: string, body?: string, options?: NotifyOpts) {
  if (typeof window === "undefined") return;

  const granted = "Notification" in window && Notification.permission === "granted";
  const payload: NotificationOptions = {
    body,
    icon: options?.icon ?? "/icons/pomodoro.png", // revisar
    requireInteraction: options?.requireInteraction ?? true,
    tag: options?.tag,
    silent: options?.silent ?? false,
    data: options?.data,
  };

  try {
    if (granted) {
      const n = new Notification(title, payload);
      n.onclick = () => {
        window.focus();
        n.close();
      };
      return;
    }

    if ("serviceWorker" in navigator && granted) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, payload);
      return;
    }
  } catch {
  }

  blinkTitle(title);
  if (document.hidden) {
    window.addEventListener(
      "focus",
      () => {
        try {
          alert(`${title}${body ? "\n\n" + body : ""}`);
        } catch {}
      },
      { once: true }
    );
  } else {
    try {
      alert(`${title}${body ? "\n\n" + body : ""}`);
    } catch {}
  }
}

  