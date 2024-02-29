"use client";

import { redirect, usePathname } from "next/navigation";
import { usePathValidation } from "@/hooks/usePathValidation";
import { GradientMaker } from "@/components/gradient-maker";

export default function Page() {
  const colorRegexp = /^\/(?:[0-9a-fA-F]{6}-){1,}[0-9a-fA-F]{6}$/;
  const path = usePathname();
  const { validatePath } = usePathValidation(path, colorRegexp);

  if (!validatePath()) redirect("/");

  return (
    <main className="flex flex-1 justify-center items-center">
      <GradientMaker />
    </main>
  );
}
