"use client";

import React, { useState } from "react";
import { GradientPreview } from "./gradient-preview";
import { Pointer } from "./pointer";
import { GradientType } from "@/app/types/gradient";
import useElementSize from "@/app/hooks/useSize";

const DEAFULTGRADIENT: GradientType = {
  angle: "90",
  type: "linear",
  colors: [
    { id: "1", color: "f43f5e", position: 0 },
    { id: "2", color: "d946ef", position: 100 },
  ],
};

export const GradientTrack = () => {
  const [gradient, setGradient] = useState({
    angle: "90",
    type: "linear",
    colors: [
      { id: "1", color: "f43f5e", position: 0 },
      { id: "2", color: "d946ef", position: 100 },
    ],
  });

  const { ref } = useElementSize();

  const updatePosition = (data: { id: string; position: number }) => {
    const { id, position } = data;

    setGradient((state) => {
      const newColors = state.colors.map((color) =>
        color.id === id ? { ...color, position: position } : color
      );
      const sortColor = newColors.sort((a, b) => a.position - b.position);
      return { ...state, colors: sortColor };
    });
  };

  return (
    <div className=" relative w-full h-[390px]" ref={ref}>
      {gradient.colors.map((color) => (
        <Pointer
          color={color}
          onChange={(e) => updatePosition(e)}
          key={color.id}
        />
      ))}
      <GradientPreview gradient={gradient} />
    </div>
  );
};
