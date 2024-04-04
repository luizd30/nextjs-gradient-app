"use client";

import { UseMovePosition, clamp, useMove } from "@/app/hooks/useMove";
import {} from "@/app/hooks/useSize";
import { ColorType } from "@/app/types/gradient";
import React, { useEffect, useRef } from "react";

type Props = {
  color: ColorType;
  onChange: ({ id, position }: { id: string; position: number }) => void;
};

export const pixelToPercentage = (
  value: number,
  elementWidth: number,
  containerWidth: number
) => {
  return Math.floor(containerWidth * (value / 100) - elementWidth / 2);
};

export const Pointer = ({ color, onChange }: Props) => {
  const { id, color: hexColor, position } = color;

  const _position = useRef({ x: 0, y: 0 });

  const { ref } = useMove(changePosition);

  function changePosition(mouse: UseMovePosition) {
    const step = 100;
    if (ref.current && ref.current.parentElement) {
      const pointer = ref.current.getBoundingClientRect();
      const container = ref.current.parentElement.getBoundingClientRect();

      const max = container.width - pointer.width;

      const stepWidth = max / step;
      const closestStep = Math.floor((mouse.x - 12) / stepWidth);

      onChange({ id: id, position: clamp(closestStep, 0, 100) });
    }
  }

  useEffect(() => {
    if (ref.current && ref.current.parentElement) {
      const pointer = ref.current.getBoundingClientRect();
      const container = ref.current.parentElement.getBoundingClientRect();

      const posX = (position / 100) * (container.width - pointer.width);
      const posY = container.height / 2 - pointer.height / 2;

      _position.current.x = posX;
      _position.current.y = posY;
    }
  }, [position]);

  return (
    <span
      ref={ref}
      className="block absolute w-6 h-6 border-2 border-slate-300 rounded-full"
      style={{
        background: `#${hexColor}`,
        left: `${_position.current.x}px`,
        top: `${_position.current.y}px  `,
      }}
    />
  );
};
