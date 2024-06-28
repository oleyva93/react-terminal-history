import { memo } from "react";

import PropTypes from "prop-types";

const ListItem = ({
  key,
  index,
  isVisible,
  style,
  showSkeleton,
  positionColor,
  highlightedLogs,
  renderLine,
  className,
}) => {
  const showLoading = !isVisible && showSkeleton;
  const isSpacing = highlightedLogs?.type === "space";

  return (
    <li
      style={style}
      key={key}
      className="container mx-[19px] grid grid-cols-[repeat(16,50px)] gap-3 text-white"
    >
      {!isSpacing ? (
        <div className="border-r border-gray-focus text-gray-focus flex justify-end item-end pr-[8px] w-[55px]">
          {!showLoading ? (
            index + 1
          ) : (
            <div className="h-2.5 bg-gray-600 rounded-full w-52 mb-4 mt-2" />
          )}
        </div>
      ) : (
        <div className="border-r border-gray-focus text-gray-focus flex justify-end item-end pr-[8px] w-[55px]" />
      )}

      {!isSpacing ? (
        <div
          className={`col-span-12 w-max hover:bg-secondary ${className} ${positionColor}`}
        >
          {!showLoading ? (
            renderLine?.(highlightedLogs) || highlightedLogs
          ) : (
            <div className="h-2.5 bg-gray-600 rounded-full w-[600px] mb-4 mt-2" />
          )}
        </div>
      ) : (
        <div className="col-span-12 w-max hover:bg-secondary h-2.5" />
      )}
    </li>
  );
};

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  style: PropTypes.object,
  showSkeleton: PropTypes.bool.isRequired,
  positionColor: PropTypes.string.isRequired,
  highlightedLogs: PropTypes.string.isRequired,
  renderLine: PropTypes.func,
  key: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const MemoizedListItem = memo(ListItem);
export default MemoizedListItem;
