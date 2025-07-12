export function areObjectLeftKeysEqual<T extends Record<string, unknown>>(
  obj1: T,
  obj2: Record<string, unknown> | undefined | null = {}
): boolean {
  if (!obj1 || !obj2) {
    return false;
  }
  for (const key in obj1) {
    if (key in obj2) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}
