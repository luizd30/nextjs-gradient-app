import { GradientType } from "@/context/color-context";
import parseToCss from "@/lib/objToCss";

export const Preview = ({ gradient }: { gradient: GradientType }) => {
  return (
    <div
      className="h-[390px] rounded-lg"
      style={{ backgroundImage: parseToCss(gradient) }}
    ></div>
  );
};
