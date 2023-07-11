import { Fragment } from "react";

export const isMac =
  typeof window !== "undefined"
    ? navigator.userAgent.indexOf("Mac OS X") != -1
    : false;

export const doHighlight = (data, value) => {
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

export const filterLogs = (data, value) => {
  return value
    ? data?.filter((log) => log.toLowerCase()?.includes(value.toLowerCase()))
        .length
    : 0;
};
