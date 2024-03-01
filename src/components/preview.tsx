import {
  ColorContext,
  ColorContextType,
  GradientType,
} from "@/context/color-context";
import parseToCss from "@/lib/objToCss";
import { Pointer } from "./pointer";
import { useContext } from "react";
import useMeasure from "@/hooks/useMeasure";
import {
  SelectedContext,
  SelectedContextType,
} from "@/context/selected-color-context";

type Props = {
  gradient: GradientType;
};

export const Preview = ({ gradient }: Props) => {
  const [measure, measuredRef] = useMeasure();
  const { gradientValues, setColorPosition } = useContext(
    ColorContext
  ) as ColorContextType;
  const { selectedColor, changeSelectedColor } = useContext(
    SelectedContext
  ) as SelectedContextType;

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
              selectId={selectedColor.id}
              onSelect={(e) => changeSelectedColor(e)}
              onChange={(e) => setColorPosition(e)}
              key={colorDetails.id}
            />
          ))
        : null}
    </div>
  );
};
