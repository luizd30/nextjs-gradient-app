export const calcPixelValue = (width: number, position: string): number => {
  return Math.floor((width / 100) * parseInt(position, 10));
};
