import { Preview } from "./preview";
import { ColorControls } from "./color-controls";

export const GradientMaker = () => {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl w-[800px] min-w-[375px] border border-slate-400 dark:border-neutral-700 overflow-hidden ">
      <Preview />
      <ColorControls />
    </div>
  );
};
