"use client";

import { Preview } from "@/components/preview";
import { ColorContext, ColorContextType } from "@/context/color-context";
import { usePathValidation } from "@/hooks/usePathValidation";
import { redirect, usePathname } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const {gradientValues} = useContext(ColorContext) as ColorContextType
  const colorRegexp = /^\/(?:[0-9a-fA-F]{6}-){1,}[0-9a-fA-F]{6}$/;
  const path = usePathname();
  const { validatePath } = usePathValidation(path, colorRegexp);

  console.log(gradientValues)

  if (!validatePath()) redirect("/");

    return <div></div>;
}
