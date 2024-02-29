"use client";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { MeasureType } from "./preview";
import { calcPercentValue } from "@/lib/percentValue";
import { calcPixelValue } from "@/lib/pixelValue";

type Props = {
  parentMeasures: MeasureType;
  colorDetails: { id: string; pos: string; color: string };
  selectId: string;
  onSelect: (id: string) => void;
  onChange: ({ id, pos }: { id: string; pos: string }) => void;
};

export const Pointer = ({
  parentMeasures,
  colorDetails,
  selectId,
  onSelect,
  onChange,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { height, width, x } = parentMeasures;
  const { id, pos, color } = colorDetails;

  const pxValue = calcPixelValue(width, pos);

  const handleChange = () => {
    if (!ref.current) return;

    const percent = calcPercentValue(
      ref.current.getBoundingClientRect(),
      x,
      width
    );

    onChange({ id: id, pos: percent });
  };

  return (
    <motion.div
      ref={ref}
      drag="x"
      dragElastic={false}
      dragMomentum={false}
      dragConstraints={{ left: 0 - 12, right: width - 12 }}
      animate={{
        y: height / 2 - 12,
        x: pxValue - 12,
      }}
      transition={{ ease: "linear", delay: 0, duration: 0 }}
      onDrag={handleChange}
      onPointerDown={() => onSelect(id)}
      className={cn(
        "flex items-center justify-center absolute h-6 w-6 rounded-full bg-neutral-50 border-2 border-neutral-300 transition-shadow cursor-pointer",
        {
          "border-neutral-950 shadow-[0_0px_0px_5px_rgba(10,10,10,0.25)] z-50":
            selectId === id,
        }
      )}
    >
      <span
        className="w-full h-full rounded-full border-2 border-neutral-50"
        style={{ backgroundColor: `#${color}` }}
      />
    </motion.div>
  );
};
