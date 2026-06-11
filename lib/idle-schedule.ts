/** Відкладає роботу до після load + idle — менше TBT на старті. */
export function scheduleAfterIdle(
  onReady: () => void,
  delayMs = 0,
  idleTimeoutMs = 3000,
): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const start = () => {
    if (cancelled) return;

    const run = () => {
      if (!cancelled) onReady();
    };

    timeoutId = setTimeout(() => {
      if (cancelled) return;
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(run, { timeout: idleTimeoutMs });
      } else {
        run();
      }
    }, delayMs);
  };

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start, { once: true });
  }

  return () => {
    cancelled = true;
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
  };
}
