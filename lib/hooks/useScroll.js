import { useRef, useState } from "react";
import useEvent from "./useEvent";

const useScroll = () => {
  const ref = useRef(null);
  const [isTop, setIsTop] = useState(true);

  const handleBottomScroll = useEvent(() => {
    const div = ref.current;
    div.scrollTop = div.scrollHeight - div.clientHeight;
    setIsTop(false);
  });

  const handleTopScroll = useEvent(() => {
    const div = ref.current;
    div.scrollTop = 0;
    setIsTop(true);
  });

  return {
    ref,
    isTop,
    handleBottomScroll,
    handleTopScroll,
    hasScroll: ref?.current?.scrollHeight > ref?.current?.clientHeight,
  };
};

export default useScroll;
