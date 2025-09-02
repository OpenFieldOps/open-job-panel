export type DebouncedFunction<Args extends unknown[]> = {
  (...args: Args): void;
  cancel: () => void;
};

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): DebouncedFunction<Args> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Args): void => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  debounced.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
