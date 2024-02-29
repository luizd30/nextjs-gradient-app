import { ColorType } from "@/context/color-context";

export const sortColors = (colors: ColorType[]) => {
  return colors.sort((a, b) => Number(a.pos) - Number(b.pos));
};
