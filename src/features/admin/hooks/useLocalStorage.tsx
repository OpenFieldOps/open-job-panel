import { useCallback, useState } from "react";
import { useWindowEvent } from "@/hooks/useWindowEvent";

export function useLocalStorage<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : defaultValue;
  });

  useWindowEvent("storage", (event) => {
    if (event.key === key && event.newValue) {
      setValue(JSON.parse(event.newValue) as T);
    }
  });

  const setValueWithLocalStorage = useCallback(
    (newValue: T) => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: key,
          newValue: JSON.stringify(newValue),
          storageArea: localStorage,
        })
      );
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  return [value, setValueWithLocalStorage] as const;
}
