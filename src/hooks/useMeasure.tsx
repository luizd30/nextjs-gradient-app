import { useState, useCallback } from "react";

type UseMeasureReturnType = [
  MeasureType | undefined,
  (node: HTMLElement | null) => void
];

export type MeasureType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function useMeasure(): UseMeasureReturnType {
  const [measure, setMeasure] = useState<MeasureType>();

  const measuredRef = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        const { width, height, x, y } = node.getBoundingClientRect();
        setMeasure({ width, height, x, y });
      }
    },
    []
  );

  return [measure, measuredRef];
}

export default useMeasure;
