import { useEffect, useRef } from "react";

// A hook that stores the previous value of a variable. Useful for scenarios
// like comparing previous props and current props in dependency arrays of
// useEffect, useMemo, useCallback, etc.
export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
