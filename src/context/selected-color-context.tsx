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
  const [currentColor, setCurrentColor] = useState(gradientValues.colors[0].id);

  const selectedColor = gradientValues.colors.find(
    ({ id }) => id === currentColor
  ) as ColorType;

  const changeSelectedColor = (id: string) => {
    setCurrentColor(id);
  };

  return (
    <SelectedContext.Provider value={{ selectedColor, changeSelectedColor }}>
      {children}
    </SelectedContext.Provider>
  );
};
