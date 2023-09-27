import { useLayoutEffect, useEffect } from "react";

/**
 * A custom hook that returns `useLayoutEffect` if the code is running on the client-side,
 * and `useEffect` if it's running on the server-side.
 *
 * @function
 * @param {function} effect - The effect to be executed.
 * @param {Array} dependencies - The dependencies to be passed to the effect.
 * @returns {undefined}
 *
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
