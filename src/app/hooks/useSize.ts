import React, { useEffect, useRef, useState } from "react";

export type TypeSize = { width: number; height: number };

const useElementSize = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<TypeSize>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;

      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width: Math.floor(width), height: Math.floor(height) });
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { ref, size };
};

export default useElementSize;
