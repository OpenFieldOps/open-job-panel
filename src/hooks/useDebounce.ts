import { useCallback, useRef } from "react";
import { type DebouncedFunction, debounce } from "@/utils/lodash-impl";

export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
) {
  const debouncedRef = useRef<DebouncedFunction<Args>>(null);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (debouncedRef.current) {
        debouncedRef.current.cancel();
      }
      debouncedRef.current = debounce(callback, delay);
      if (debouncedRef.current) {
        debouncedRef.current(...args);
      }
    },
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (debouncedRef.current) {
      debouncedRef.current.cancel();
    }
  }, []);

  return { debouncedCallback, cancel };
}
