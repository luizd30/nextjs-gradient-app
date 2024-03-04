import { ColorType } from "@/context/color-context";

export const generateData = (
  colorString: string | string[],
  positions: string | null
): ColorType[] => {
  if (Array.isArray(colorString)) return [];
  const colors = colorString.split("-");

  const numCores = colors.length;
  const intervalo = 100 / (numCores - 1);

  return colors.map((color, index) => ({
    id: crypto.randomUUID(),
    color,
    pos: positions
      ? `${positions.split(",")[index]}`
      : `${Math.floor(index * intervalo)}`,
  }));
};
