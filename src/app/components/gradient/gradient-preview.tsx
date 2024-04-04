"use client";
import { GradientType } from "@/app/types/gradient";
import React from "react";

const DEAFULTGRADIENT: GradientType = {
  angle: "90",
  type: "linear",
  colors: [
    { id: "1", color: "f43f5e", position: 0 },
    { id: "2", color: "d946ef", position: 100 },
  ],
}; //remove after done

type Props = {
  gradient?: GradientType;
};

const cssGradient = (gradient: GradientType) => {
  const { angle, type, colors } = gradient;

  const _angle = type === "linear" ? `${angle}deg` : "radial";
  const _colors = colors.map(({ color, position }) => `#${color} ${position}%`);

  return `${type}-gradient(${_angle}, ${_colors.join(",")})`;
};

export const GradientPreview = ({ gradient = DEAFULTGRADIENT }: Props) => {
  
  return (
    <div
      className="rounded-lg h-full mx-3"
      style={{ background: cssGradient(gradient) }}
    />
  );
};
