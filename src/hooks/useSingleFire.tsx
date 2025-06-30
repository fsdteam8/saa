import { useRef } from "react";

/**
 * Custom hook to safely fire a function once.
 * Returns a function that will only call the passed-in callback once.
 */
export function useSingleFire() {
  const hasFired = useRef(false);

  const fireOnce = (fn: () => void) => {
    if (!hasFired.current) {
      hasFired.current = true;
      fn();
    }
  };

  const reset = () => {
    hasFired.current = false;
  };

  return { fireOnce, reset };
}
