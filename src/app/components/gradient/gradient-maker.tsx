import React from "react";
import { GradientTrack } from "./gradient.track";

export const GradientMaker = () => {
  return (
    <div className="relative flex gap-4 flex-col px-3 py-6 w-[900px] border border-slate-400 rounded-2xl">
      <GradientTrack />
    </div>
  );
};
