import { GradientType } from "@/context/color-context";

const updateHistory = (gradientValue: GradientType) => {
  const stateObj = {
    pageTitle: "Nova página de gradiente",
    gradientValues: gradientValue,
    timestamp: new Date().toISOString(),
  };

  const colors = gradientValue.colors.map(({ color }) => color).join("-");
  const positions = gradientValue.colors.map(({ pos }) => pos).join(",");
  const type = gradientValue.type;
  const angle = gradientValue.angle;

  const mergedValues = `${colors}?pos=${positions}&type=${type}&angle=${angle}`;

  history.pushState(stateObj, "", `/${mergedValues}`);
};

export default updateHistory;
