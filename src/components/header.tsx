import Image from "next/image";
import React from "react";
import logo from "../../public/logo.svg";

export const Header = () => {
  return (
    <header className="h-16 flex items-center px-8 border-b border-b-slate-300 dark:border-b-neutral-900">
      <div className="flex gap-2">
        <Image src={logo} alt="logo" />
        <p className="font font-bold text-xl">Gradient</p>
      </div>
    </header>
  );
};
