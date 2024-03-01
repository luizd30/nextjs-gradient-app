"use client";
import { sortColors } from "@/lib/sortColors";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

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
  setColorPosition: (value: Omit<ColorType, "color">) => void;
};

const generateData = (
  colorString: string | string[],
  positions: string | null
) => {
  if (Array.isArray(colorString)) return [];
  const colors = colorString.split("-");

  const numCores = colors.length;
  const intervalo = 100 / (numCores - 1);

  const objetosCores = colors.map((color, index) => ({
    id: crypto.randomUUID(),
    color: color,
    pos: positions
      ? `${positions.split(",")[index]}`
      : `${Math.floor(index * intervalo)}`,
  }));
  return objetosCores;
};

export const ColorContext = createContext<ColorContextType | null>(null);

export const ColorProvider = ({ children }: Props) => {
  const router = useRouter();
  const { gradient } = useParams();
  const searchParams = useSearchParams();

  const positions = searchParams.get("pos");
  const angle = searchParams.get("angle") || "90";
  const type = searchParams.get("type") || "linear";

  const [gradientValues, setGradientValues] = useState({
    type: type,
    angle: angle,
    colors: generateData(gradient, positions),
  });

  function updateGradientValues(
    updateFn: (prev: GradientType) => GradientType
  ) {
    setGradientValues((prev) => updateFn({ ...prev }));
  }

  const setColorPosition = (value: Omit<ColorType, "color">) => {
    const { id, pos } = value;
    updateGradientValues((prev) => {
      const updatePos = prev.colors.map((color) =>
        color.id === id ? { ...color, pos: pos } : color
      );
      const sortedColors = sortColors(updatePos);
      return { ...prev, colors: sortedColors };
    });
  };

  return (
    <ColorContext.Provider value={{ gradientValues, setColorPosition }}>
      {children}
    </ColorContext.Provider>
  );
};
