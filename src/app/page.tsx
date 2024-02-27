import { colorPath } from "@/lib/colorPath";
import { redirect } from "next/navigation";

export default function Home() {
  const path = colorPath();
  redirect(`/${path}`);
}
