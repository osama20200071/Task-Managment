import { useRef } from "react";
import { useState } from "react";

export function useDebouncedValue(initialValue, delay) {
  const [state, setState] = useState(initialValue);
  const timerRef = useRef(null);

  function ChangeHandler(e) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setState(e.target.value);
    }, delay);
  }

  return { state, ChangeHandler };
}
