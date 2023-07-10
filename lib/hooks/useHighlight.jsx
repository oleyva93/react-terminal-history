import { Fragment, useEffect, useState, useTransition } from "react";
import useEvent from "./useEvent";

const doHighlight = (data, value) => {
  let highlightIndex = [];
  const logs = data.map((log, index) => {
    const wordIndex = log.toLowerCase().indexOf(value?.toLowerCase());
    if (wordIndex !== -1) {
      highlightIndex.push(index);
      const start = log.slice(0, wordIndex);
      const end = log.slice(wordIndex + value?.length);
      return (
        <Fragment key={index}>
          {start}
          <span className="bg-[#ffcc00]">
            {log.slice(wordIndex, wordIndex + value?.length)}
          </span>
          {end}
        </Fragment>
      );
    }

    if (!value) highlightIndex = [];

    return log;
  });
  return { logs, highlightIndex };
};

const filterLogs = (data, value) => {
  return value
    ? data?.filter((log) => log.toLowerCase()?.includes(value.toLowerCase()))
        .length
    : 0;
};

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
