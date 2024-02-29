import React, { useContext } from "react";
import { Preview } from "./preview";
import { ColorContext, ColorContextType } from "@/context/color-context";

export const GradientMaker = () => {
  const { gradientValues } = useContext(ColorContext) as ColorContextType;
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl w-[800px] min-w-[375px] border border-slate-400 dark:border-neutral-700 overflow-hidden ">
      <Preview gradient={gradientValues} />
    </div>
  );
};
