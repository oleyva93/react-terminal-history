import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AutoSizer, List } from "react-virtualized";

import {
  ControlIcon,
  DownIcon,
  LoadingIcon,
  OptionsIcon,
  UpIcon,
} from "./icons";
import useHighlight from "../hooks/useHighlight";
import useEvent from "../hooks/useEvent";
import Tooltip from "./tooltip";
import { colors } from "../theme";
import ListItem from "./list-item";

/**
 * @typedef {Object} ReactTerminalHistoryProps
 * @property {string[]} data - Array of strings to be displayed
 * @property {string} title - Title of the terminal
 * @property {Object} classes - Classes to be applied to the terminal
 * @property {string} classes.container - Classes to be applied to the terminal container
 * @property {string} classes.header - Classes to be applied to the terminal header
 * @property {string} classes.content - Classes to be applied to the terminal content
 * @property {string} classes.input - Classes to be applied to the terminal input
 * @property {function} renderLine - Function to render each terminal line
 * @property {JSX.Element} optionIcon - Option icon
 *
 * @param {ReactTerminalHistoryProps} props
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * import ReactTerminalHistory from "react-terminal-history/dist";
 *
 * const fakeData = ["Line1", "Line2"];

 * function App() {
 *  return (
 *   <>
 *    <div className="flex justify-center items-center h-screen p-20">
 *      <ReactTerminalHistory data={fakeData} title="Logs" />
 *    </div>
 *   </>
 *  );
 * }
 *
 * export default App;
 **/

function ReactTerminalHistory({
  data,
  title,
  classes,
  renderLine,
  showSkeleton,
  notFoundContent,
  loading,
  optionIcon,
}) {
  const [highlightPosition, setHighlightPosition] = useState(0);
  const [showOpen, setShowOpen] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState(0);

  const { highlightedLogs, matches, handleHighlight, highlighIndexes } =
    useHighlight(data);

  const handleScrollDown = useEvent(() => {
    if (highlighIndexes[highlightPosition + 1]) {
      setHighlightPosition((prev) => prev + 1);
      setScrollToIndex(highlighIndexes[highlightPosition + 1]);
    }
  });

  const handleScrollUp = useEvent(() => {
    if (highlighIndexes[highlightPosition] && highlightPosition > 0) {
      setHighlightPosition((prev) => prev - 1);
      setScrollToIndex(highlighIndexes[highlightPosition - 1]);
    }
  });

  const handleKeyDown = useEvent((event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.metaKey || event.ctrlKey) {
        handleScrollUp();
      } else {
        handleScrollDown();
      }
    }
  });

  useEffect(() => {
    if (highlightedLogs.length) {
      setScrollToIndex(highlightedLogs.length - 1);
    }
  }, [highlightedLogs.length, setScrollToIndex]);

  return (
    <section className={`min-w-[550px] w-full ${classes?.container}`}>
      <header
        className={`grid grid-cols-2 grid-flow-row-dense bg-base rounded-t-lg gap-2 ${classes?.header} px-4 py-2`}
      >
        <div className="col-span-1 col-start-1 flex items-center text-base font-medium text-white">
          {title}
        </div>
        <div
          className="col-span-1 col-end-6 flex cursor-pointer justify-end gap-3"
          onClick={() => setShowOpen((prev) => !prev)}
        >
          {optionIcon ?? (
            <OptionsIcon className="text-[29px] p-1" color={colors.option} />
          )}
        </div>
      </header>
      <main
        className={`grid rounded-b-lg bg-main ${classes?.content} h-[500px] py-1 relative`}
      >
        <aside
          className={`flex z-50 absolute right-5 top-1 gap-3 bg-base p-1.5 rounded text-option w-max transition-opacity duration-200 ${
            showOpen ? "opacity-75 hover:opacity-100" : "opacity-0"
          }`}
        >
          <input
            placeholder="Search..."
            className={`bg-secondary p-2 text-option h-[30px] border border-option !rounded placeholder:text-option focus:outline-none focus:ring focus:ring-[#7c7c7c] focus:border-[##7c7c7c] focus:w-[240px] ${classes?.input}}`}
            onChange={(e) => {
              setHighlightPosition(0);
              handleHighlight(e);
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="mr-[10px] flex items-center select-none">
            {matches ? highlightPosition + 1 : 0} of {matches}
          </div>
          <Tooltip
            message={
              <div className="flex items-center gap-1 text-xs">
                Previous Match (
                <ControlIcon color="#4b5563" className="-ml-1" /> + Enter)
              </div>
            }
          >
            <UpIcon
              className="text-[29px] border border-option rounded cursor-pointer p-1"
              color={colors.option}
              onClick={handleScrollUp}
            />
          </Tooltip>
          <Tooltip
            message={
              <div className="flex items-center gap-1 text-xs">
                Next Match (Enter)
              </div>
            }
          >
            <DownIcon
              className="text-[29px] border border-option rounded cursor-pointer p-1"
              color={colors.option}
              onClick={handleScrollDown}
            />
          </Tooltip>
        </aside>
        <AutoSizer>
          {({ width, height }) => (
            <List
              containerStyle={{ overflowX: "auto" }}
              width={width}
              height={height}
              rowCount={data.length}
              rowHeight={22}
              scrollToIndex={scrollToIndex}
              noRowsRenderer={() => (
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[15px] font-medium text-white">
                  {loading ? <LoadingIcon /> : notFoundContent}
                </div>
              )}
              rowRenderer={({ key, index, isVisible, style }) => {
                return (
                  <ListItem
                    key={key}
                    index={index}
                    isVisible={isVisible}
                    style={style}
                    showSkeleton={showSkeleton}
                    positionColor={
                      index === highlighIndexes[highlightPosition]
                        ? "bg-red-400"
                        : ""
                    }
                    highlightedLogs={highlightedLogs[index]}
                    renderLine={renderLine}
                  />
                );
              }}
            />
          )}
        </AutoSizer>
        <footer className="absolute z-50 bottom-2 right-5 opacity-25 hover:opacity-100">
          {!scrollToIndex ? (
            <DownIcon
              className="text-[29px] bg-base rounded-full cursor-pointer p-1"
              color={colors.option}
              onClick={() => setScrollToIndex(highlightedLogs.length - 1)}
            />
          ) : (
            <UpIcon
              className="text-[29px] bg-base rounded-full cursor-pointer p-1"
              color={colors.option}
              onClick={() => setScrollToIndex(0)}
            />
          )}
        </footer>
      </main>
    </section>
  );
}

ReactTerminalHistory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.node,
  showSkeleton: PropTypes.bool,
  loading: PropTypes.bool,
  renderLine: PropTypes.func,
  notFoundContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  optionIcon: PropTypes.node,
  classes: PropTypes.shape({
    container: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    input: PropTypes.string,
  }),
};

ReactTerminalHistory.defaultProps = {
  data: [],
  title: "History",
  renderLine: null,
  showSkeleton: false,
  loading: false,
  notFoundContent: "No history found",
  classes: {
    container: "",
    header: "",
    content: "",
    input: "",
  },
  optionIcon: null,
};

ReactTerminalHistory.displayName = "ReactTerminalHistory";

const MemoizedReactTerminalHistory = memo(ReactTerminalHistory);

export default MemoizedReactTerminalHistory;
