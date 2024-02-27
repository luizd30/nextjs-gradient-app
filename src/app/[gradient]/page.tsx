"use client";
import { usePathValidation } from "@/hooks/usePathValidation";
import { redirect, usePathname } from "next/navigation";

export default function Page() {
  const colorRegexp = /^\/(?:[0-9a-fA-F]{6}-){1,}[0-9a-fA-F]{6}$/;
  const path = usePathname();
  const { validatePath } = usePathValidation(path, colorRegexp);

  if (!validatePath()) redirect("/");

  return <h1>Gradient</h1>;
}
