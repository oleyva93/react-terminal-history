import { useEffect, useState, useTransition } from "react";
import useEvent from "./useEvent";

const doHighlight = (data, value) => {
  return data.map((log) => {
    const index = log.toLowerCase().indexOf(value?.toLowerCase());
    if (index !== -1) {
      const start = log.slice(0, index);
      const end = log.slice(index + value?.length);
      return (
        <>
          {start}
          <span className="!bg-[#ffcc00]">
            {log.slice(index, index + value?.length)}
          </span>
          {end}
        </>
      );
    }
    return log;
  });
};

const filterLogs = (data, value) => {
  return value
    ? data?.filter((log) => log.toLowerCase()?.includes(value.toLowerCase()))
        .length
    : 0;
};

const useHighlight = (data) => {
  const [, startTransition] = useTransition();

  const [highlightedLogs, setHighlightedLogs] = useState(data);
  const [matches, setMatches] = useState(0);

  const handleHighlight = useEvent((e) => {
    const { value } = e.target;
    const highligh = doHighlight(data, value);
    startTransition(() => {
      setMatches(filterLogs(data, value));
      setHighlightedLogs(highligh);
    });
  });

  useEffect(() => {
    if (data.length) {
      startTransition(() => {
        setHighlightedLogs(data);
      });
    }
  }, [data]);

  return { highlightedLogs, matches, handleHighlight };
};

export default useHighlight;
