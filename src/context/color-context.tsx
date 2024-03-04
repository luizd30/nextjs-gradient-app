"use client";
import useDebounce from "@/hooks/useDebounce";
import { generateData } from "@/lib/colorUtils";
import { sortColors } from "@/lib/sortColors";
import updateHistory from "@/lib/updateHistory";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useCallback, useState } from "react";

const DEFAULT_ANGLE = "90";
const DEFAULT_TYPE = "linear";
const DEBOUNCE_DELAY = 500;

type Props = { children: React.ReactNode };

export type ColorType = {
  id: string;
  color: string;
  pos: string;
};

export type GradientType = {
  type: string;
  angle: string;
  colors: ColorType[];
};

export type ColorContextType = {
  gradientValues: GradientType;
  setPosition: (value: Omit<ColorType, "color">) => void;
  setColor: (value: Omit<ColorType, "pos">) => void;
};

export const ColorContext = createContext<ColorContextType | null>(null);

export const ColorProvider = ({ children }: Props) => {
  const { gradient } = useParams();
  const searchParams = useSearchParams();

  const positions = searchParams.get("pos");
  const angle = searchParams.get("angle") || DEFAULT_ANGLE;
  const type = searchParams.get("type") || DEFAULT_TYPE;

  const [gradientValues, setGradientValues] = useState({
    type: type,
    angle: angle,
    colors: generateData(gradient, positions),
  });

  const handleUpdateHistory = useCallback(() => {
    updateHistory(gradientValues);
  }, [gradientValues]);

  useDebounce(handleUpdateHistory, DEBOUNCE_DELAY, [gradientValues]);

  const updateGradientValues = useCallback(
    (updateFn: (prev: GradientType) => GradientType) => {
      setGradientValues((prev) => updateFn({ ...prev }));
    },
    []
  );

  const setPosition = useCallback(
    (value: Omit<ColorType, "color">) => {
      const { id, pos } = value;
      updateGradientValues((prev) => {
        const updatePos = prev.colors.map((obj) =>
          obj.id === id ? { ...obj, pos } : obj
        );
        const sortedColors = sortColors(updatePos);
        return { ...prev, colors: sortedColors };
      });
    },
    [updateGradientValues]
  );

  const setColor = useCallback(
    (value: Omit<ColorType, "pos">) => {
      const { id, color } = value;
      updateGradientValues((prev) => {
        const updateColor = prev.colors.map((obj) =>
          obj.id === id ? { ...obj, color } : obj
        );
        return { ...prev, colors: updateColor };
      });
    },
    [updateGradientValues]
  );

  return (
    <ColorContext.Provider value={{ gradientValues, setPosition, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};
