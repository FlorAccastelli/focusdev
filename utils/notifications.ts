export async function ensureNotificationPermission() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    const res = await Notification.requestPermission();
    return res === "granted";
  }
  
  export function notify(title: string, body?: string) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted" && document.visibilityState === "hidden") {
      new Notification(title, { body, silent: false });
    }
  }
  