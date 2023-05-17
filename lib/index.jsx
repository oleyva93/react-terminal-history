import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { DownIcon, UpIcon } from "./components/icons";
import useHighlight from "./hooks/useHighlight";
import useScroll from "./hooks/useScroll";

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
 * import { fakeData } from "./fakeData";
 * import ReactTerminalHistory from "react-terminal-history/dist";
 *
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
  const { isTop, ref, handleTopScroll, handleBottomScroll, hasScroll } =
    useScroll();
  const { highlightedLogs, matches, handleHighlight } = useHighlight(data);

  useEffect(() => {
    if (highlightedLogs.length) {
      handleBottomScroll();
    }
  }, [highlightedLogs.length, handleBottomScroll]);

  return (
    <section className={` min-w-[550px] w-full ${classes?.container}`}>
      <header
        className={`grid grid-cols-2 bg-[#4b5563] rounded-t-lg gap-2 ${classes?.header} px-4 py-2 text-white`}
      >
        <div>{title}</div>
        <div className="flex justify-end gap-3">
          {Boolean(matches) && (
            <div className="mr-[10px] flex items-center">
              Matches: {matches}
            </div>
          )}
          <input
            placeholder="Search..."
            className={`bg-[#464646] p-2 text-[#c7c7c7] h-[30px] border border-[#c7c7c7] !rounded placeholder:text-[#c7c7c7] focus:outline-none focus:ring focus:ring-[#7c7c7c] focus:border-[##7c7c7c] focus:w-[300px] ${classes?.input}}`}
            onChange={handleHighlight}
          />
          {isTop && hasScroll ? (
            <DownIcon
              className="text-[29px] border border-[#c7c7c7] rounded cursor-pointer p-1"
              color="#c7c7c7"
              onClick={handleBottomScroll}
            />
          ) : (
            <UpIcon
              className="text-[29px] border border-[#c7c7c7] rounded cursor-pointer p-1"
              color="#c7c7c7"
              onClick={handleTopScroll}
            />
          )}
        </div>
      </header>
      <div
        className={`grid rounded-b-lg bg-[#2b2928] ${classes?.content} h-[500px]`}
      >
        <ul
          className="overflow-y-auto overflow-x-auto font-[15px] leading-[1.3]"
          ref={ref}
        >
          {highlightedLogs?.map((item, index) => (
            <li
              key={index}
              className="container mx-[19px] grid grid-cols-[repeat(16,50px)] gap-3 text-white"
            >
              <div className="border-r border-[#a5a5a5] text-[#a5a5a5] flex justify-end item-end pr-3">
                {index + 1}
              </div>
              <div className="col-span-12 w-max hover:bg-[#464646]">
                {renderLine?.(item) || item}
              </div>
            </li>
          ))}
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
