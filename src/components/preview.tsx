import {
  ColorContext,
  ColorContextType,
  GradientType,
} from "@/context/color-context";
import parseToCss from "@/lib/objToCss";
import { Pointer } from "./pointer";
import { useCallback, useContext, useState } from "react";

export type MeasureType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Preview = ({ gradient }: { gradient: GradientType }) => {
  const { gradientValues,setColorPosition } = useContext(ColorContext) as ColorContextType;

  const [measure, setMeasure] = useState<MeasureType>();
  const [selectId, setSelectId] = useState<string>(gradientValues.colors[0].id);

  const measuredRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const { width, height, x, y } = node.getBoundingClientRect();
      setMeasure({ width: width, height: height, x: x, y: y });
    }
  }, []);

  return (
    <div
      ref={measuredRef}
      className="h-[390px] rounded-lg relative "
      style={{ backgroundImage: parseToCss(gradient) }}
    >
      {measure
        ? gradientValues.colors.map((colorDetails) => (
            <Pointer
              parentMeasures={measure}
              colorDetails={colorDetails}
              selectId={selectId}
              onSelect={(id) => setSelectId(id)}
              onChange={(value) => setColorPosition(value)}
              key={colorDetails.id}
            />
          ))
        : null}
    </div>
  );
};
