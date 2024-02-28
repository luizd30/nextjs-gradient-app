import { GradientType } from "@/context/color-context";

const parseToCss = (gradient: GradientType) => {
  const { type, angle, colors } = gradient;

  const gradientType = type === 'linear' ? 'linear-gradient' : 'radial-gradient'

  const gradientAngle = type === "linear" ? `${angle}deg` : "circle";

  const gradientColors = colors.map(({ color, pos }) => `#${color} ${pos}%`);

  return `${gradientType}(${gradientAngle}, ${gradientColors.join(", ")})`;
};

export default parseToCss;
