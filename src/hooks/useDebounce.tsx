import { useEffect } from "react";

const useDebounce = (callback: () => void, delay: number, deps: any[]) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);

    return () => clearTimeout(timer);
  }, deps);
};

export default useDebounce;
