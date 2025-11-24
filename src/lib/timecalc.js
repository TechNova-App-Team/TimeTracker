// Minimal time calculation utilities extracted from the legacy app
export function hoursBetween(start, end) {
  const d1 = new Date(`2000-01-01T${start}`);
  const d2 = new Date(`2000-01-01T${end}`);
  let diff = (d2 - d1) / 3.6e6;
  if (diff < 0) diff += 24;
  return diff;
}

export function applyAutoBreak(hours, thresh, breakMin) {
  if (thresh > 0 && hours >= thresh) return hours - breakMin / 60;
  return hours;
}
