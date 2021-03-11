import { useRef, useEffect } from "react";

export const shuffleArray = (arr: any[]) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

export const useInterval = (callback: () => any, delay: null | number) => {
  // Remember the latest callback.
  const savedCallback = useRef<any | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback) savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
