import { useCallback, useRef } from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

/**
 * A custom hook that returns a memoized callback function that can be used as an event handler.
 * @param {Function} handler - The function to be called when the event is triggered.
 * @returns {Function} - A memoized callback function that can be used as an event handler.
 */
export default function useEvent(handler) {
  const handlerRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args) => {
    const fn = handlerRef.current;
    return fn?.(...args);
  }, []);
}
