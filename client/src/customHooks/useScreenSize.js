import { useState, useEffect } from "react";

function useScreenSize() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  // eslint-disable-next-line
  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [handleResize]);

  return screenSize;
}

export default useScreenSize;
