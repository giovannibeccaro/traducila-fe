import { useState, useEffect } from "react";

export default function useCheckHeight() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (windowHeight === 0) setWindowHeight(window && window.innerHeight);
    function getWindowHeight() {
      const height = window.innerHeight;
      return height;
    }
    const handleResize = () => {
      setWindowHeight(getWindowHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowHeight]);

  return windowHeight;
}
