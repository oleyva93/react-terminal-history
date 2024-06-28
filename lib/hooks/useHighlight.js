import { useEffect, useMemo, useState, useTransition } from "react";

import { doHighlight, filterLogs } from "../utils";
import useEvent from "./useEvent";

/**
 * A custom React hook that highlights text in an array of logs based on user input.
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

  const highlightedLogsWithSpaces = useMemo(() => {
    return [...highlightedLogs, { type: "space" }, { type: "space" }];
  }, [highlightedLogs]);

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

  return {
    highlightedLogs: highlightedLogsWithSpaces,
    highlighIndexes,
    matches,
    handleHighlight,
  };
};

export default useHighlight;
