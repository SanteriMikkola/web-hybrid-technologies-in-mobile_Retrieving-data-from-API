import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs = 800) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
