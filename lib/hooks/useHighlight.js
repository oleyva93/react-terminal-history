import { useEffect, useState, useTransition } from "react";

import { doHighlight, filterLogs } from "../utils";
import useEvent from "./useEvent";

/**
 * Hook to highlight logs
 * @name useHighlight
 * @property {string[]} data - Array of strings to be displayed
 * @returns { highlightedLogs: string[], matches: number, handleHighlight: function, highlighIndexes: number[] }
 *
 **/

const useHighlight = (data) => {
  const [, startTransition] = useTransition();

  const [highlightedLogs, setHighlightedLogs] = useState(data);
  const [matches, setMatches] = useState(0);
  const [highlighIndexes, setHighlightIndexes] = useState([]);

  const handleHighlight = useEvent((e) => {
    const { value } = e.target;
    const { logs, highlightIndex } = doHighlight(data, value);
    startTransition(() => {
      setMatches(filterLogs(data, value));
      setHighlightIndexes(highlightIndex);
      setHighlightedLogs(logs);
    });
  });

  useEffect(() => {
    if (data.length) {
      startTransition(() => {
        setHighlightedLogs(data);
      });
    }
  }, [data]);

  return { highlightedLogs, highlighIndexes, matches, handleHighlight };
};

export default useHighlight;
