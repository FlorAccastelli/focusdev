let audio: HTMLAudioElement | null = null;

export function getBell() {
  if (!audio) {
    audio = new Audio("/sounds/bell.mp3");
  }
  return audio!;
}

export async function primeBell() {
  try {
    const a = getBell();
    a.volume = 0;
    await a.play();
    a.pause();
    a.currentTime = 0;
    a.volume = 1;
  } catch {
    // ignorar si el navegador bloquea
  }
}

export function playBell() {
  getBell().play().catch(() => {});
}
