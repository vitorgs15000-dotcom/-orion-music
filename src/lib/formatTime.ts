export function formatTime(seconds: number) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = Math.floor(safeSeconds % 60);
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}
