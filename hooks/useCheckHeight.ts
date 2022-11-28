import { useState, useEffect } from "react";

export default function useCheckHeight() {
  const hasWindow = typeof window !== "undefined";

  function getWindowHeight() {
    const height = hasWindow ? window.innerHeight : null;
    return {
      height,
    };
  }

  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowHeight(getWindowHeight());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowHeight;
}
