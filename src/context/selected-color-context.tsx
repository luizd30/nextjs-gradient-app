import { createContext, useContext, useState } from "react";
import { ColorContext, ColorContextType, ColorType } from "./color-context";

type Props = { children: React.ReactNode };

export type SelectedContextType = {
  selectedColor: ColorType;
  changeSelectedColor: (id: string) => void;
};

export const SelectedContext = createContext<SelectedContextType | null>(null);

export const SelectedContextProvider = ({ children }: Props) => {
  const { gradientValues } = useContext(ColorContext) as ColorContextType;
  const [selectedColor, setSelectedColor] = useState(gradientValues.colors[0]);

  const changeSelectedColor = (id: string) => {
    const color = gradientValues.colors.find((color) => color.id === id);
    if (!color) return;
    setSelectedColor(color);
  };

  return (
    <SelectedContext.Provider value={{ selectedColor, changeSelectedColor }}>
      {children}
    </SelectedContext.Provider>
  );
};
