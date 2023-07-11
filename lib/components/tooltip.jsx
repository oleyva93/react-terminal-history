import { memo, useState } from "react";

const Tooltip = ({ children, message }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute select-none pointer-events-none top-10 -left-20 p-[4px_15px] rounded bg-[#c7c7c7] !text-[#4b5563] w-max transition-opacity duration-200 ${
          isHovered ? "hover:opacity-100" : "opacity-0"
        }`}
      >
        <div className="tooltip-arrow bg-[#c7c7c7]" />
        {message}
      </div>
      {children}
    </div>
  );
};

export default memo(Tooltip);
