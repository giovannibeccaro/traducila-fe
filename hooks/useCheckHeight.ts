import { useState, useEffect } from "react";

function getWindowHeight() {
  const { innerHeight: height } = window;
  return {
    height,
  };
}

export default function useCheckHeight() {
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowHeight;
}
