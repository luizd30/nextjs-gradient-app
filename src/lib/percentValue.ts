export const calcPercentValue = (
  boundingRect: DOMRect,
  xPosition: number,
  width: number
): string => {
  const { x: pointerX } = boundingRect;
  return Math.round(((pointerX - xPosition + 12) / width) * 100).toString();
};
