import React from "react";

type Props = {
  children: React.ReactNode;
};

export const IconBtn = ({ children }: Props) => {
  return (
    <button className="h-8 w-8 rounded border-slate-300 dark:border-neutral-800">
      {children}
    </button>
  );
};
