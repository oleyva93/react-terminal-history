import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DownIcon, OptionsIcon, UpIcon } from "./icons";
import useHighlight from "../hooks/useHighlight";
import useScroll from "../hooks/useScroll";
import useEvent from "../hooks/useEvent";

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

function ReactTerminalHistory({ data, title, classes, renderLine }) {
  const [highlightPosition, setHighlightPosition] = useState(0);
  const [showOpen, setShowOpen] = useState(false);

  const { isTop, ref, handleTopScroll, handleBottomScroll, hasScroll } =
    useScroll();
  const { highlightedLogs, matches, handleHighlight, highlighIndexes } =
    useHighlight(data);

  const handleScrollDown = useEvent(() => {
    if (highlighIndexes[highlightPosition + 1]) {
      setHighlightPosition((prev) => prev + 1);
      scrollToVisibleElement(highlighIndexes[highlightPosition + 1]);
    }
  });

  const handleScrollUp = useEvent(() => {
    if (highlighIndexes[highlightPosition] && highlightPosition > 0) {
      setHighlightPosition((prev) => prev - 1);
      scrollToVisibleElement(highlighIndexes[highlightPosition - 1]);
    }
  });

  const scrollToVisibleElement = useEvent((idx) => {
    const container = ref.current;
    const element = container.children[idx];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  });

  useEffect(() => {
    if (highlightedLogs.length) {
      handleBottomScroll();
    }
  }, [highlightedLogs.length, handleBottomScroll]);

  return (
    <section className={`min-w-[550px] w-full ${classes?.container}`}>
      <header
        className={`grid grid-cols-2 grid-flow-row-dense bg-[#4b5563] rounded-t-lg gap-2 ${classes?.header} px-4 py-2 text-white`}
      >
        <div className="col-span-1 col-start-1 flex items-center text-base font-medium">
          {title}
        </div>
        <div className="col-span-1 col-end-6 flex justify-end gap-3">
          <OptionsIcon
            className="text-[29px] cursor-pointer p-1"
            color="#c7c7c7"
            onClick={() => setShowOpen((prev) => !prev)}
          />
          <div
            className={`flex absolute gap-3 bg-[#4b5563] p-1.5 mt-10 rounded text-[#c7c7c7] w-max transition-opacity duration-200 ${
              showOpen ? "opacity-75 hover:opacity-100" : "opacity-0"
            }`}
          >
            <input
              placeholder="Search..."
              className={`bg-[#464646] p-2 text-[#c7c7c7] h-[30px] border border-[#c7c7c7] !rounded placeholder:text-[#c7c7c7] focus:outline-none focus:ring focus:ring-[#7c7c7c] focus:border-[##7c7c7c] focus:w-[240px] ${classes?.input}}`}
              onChange={handleHighlight}
            />
            <div className="mr-[10px] flex items-center select-none">
              {highlightPosition + 1} of {matches}
            </div>
            <UpIcon
              className="text-[29px] border border-[#c7c7c7] rounded cursor-pointer p-1"
              color="#c7c7c7"
              onClick={handleScrollUp}
            />
            <DownIcon
              className="text-[29px] border border-[#c7c7c7] rounded cursor-pointer p-1"
              color="#c7c7c7"
              onClick={handleScrollDown}
            />
          </div>
          {hasScroll && (
            <div className="absolute bottom-[13rem] opacity-25 hover:opacity-100">
              {isTop ? (
                <DownIcon
                  className="text-[29px] bg-[#4b5563] rounded-full cursor-pointer p-1"
                  color="#c7c7c7"
                  onClick={handleBottomScroll}
                />
              ) : (
                <UpIcon
                  className="text-[29px] bg-[#4b5563] rounded-full cursor-pointer p-1"
                  color="#c7c7c7"
                  onClick={handleTopScroll}
                />
              )}
            </div>
          )}
        </div>
      </header>
      <div
        className={`grid rounded-b-lg bg-[#2b2928] ${classes?.content} h-[500px] py-1`}
      >
        <ul
          className="overflow-y-auto overflow-x-auto font-[15px] leading-[1.3]"
          ref={ref}
        >
          {highlightedLogs?.map((item, index) => {
            const positionColor =
              index === highlighIndexes[highlightPosition] ? "bg-red-400" : "";
            return (
              <li
                key={index}
                className="container mx-[19px] grid grid-cols-[repeat(16,50px)] gap-3 text-white"
              >
                <div className="border-r border-[#a5a5a5] text-[#a5a5a5] flex justify-end item-end pr-3">
                  {index + 1}
                </div>
                <div
                  className={`col-span-12 w-max hover:bg-[#464646] ${positionColor}`}
                >
                  {renderLine?.(item) || item}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

ReactTerminalHistory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.node,
  renderLine: PropTypes.func,
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
  classes: {
    container: "",
    header: "",
    content: "",
    input: "",
  },
};

ReactTerminalHistory.displayName = "ReactTerminalHistory";

const MemoizedReactTerminalHistory = memo(ReactTerminalHistory);

export default MemoizedReactTerminalHistory;
