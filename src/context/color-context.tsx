"use client";
import { useParams, useSearchParams } from "next/navigation";
import { ReactNode, createContext, useState } from "react";

type ColorTypes = {
  id: string;
  color: string;
  pos: string;
};

export type ColorContextType = {
  gradientValues: {
    type: string;
    angle: string;
    colors: ColorTypes[];
  };
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

export const ColorProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <ColorContext.Provider value={{ gradientValues }}>
      {children}
    </ColorContext.Provider>
  );
};
