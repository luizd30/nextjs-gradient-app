import { useContext } from "react";
import { ColorPicker } from "./color-picker";
import { ColorContext, ColorContextType } from "@/context/color-context";
import {
  SelectedContext,
  SelectedContextType,
} from "@/context/selected-color-context";

export const ColorControls = () => {
  const { gradientValues, setColor } = useContext(
    ColorContext
  ) as ColorContextType;
  const { selectedColor } = useContext(SelectedContext) as SelectedContextType;

  const handleChangeColor = (newColor: string) => {
    const color = { id: selectedColor.id, color: newColor };

    setColor(color);
  };

  return (
    <div>
      <ColorPicker
        color={selectedColor.color}
        onChange={(e) => handleChangeColor(e)}
      />
    </div>
  );
};
