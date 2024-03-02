import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

type Props = { color: string; onChange: (color: string) => void };

export const ColorPicker = ({ color, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root onOpenChange={(e) => setOpen(e)}>
      <DropdownMenu.Trigger
        aria-selected={open}
        asChild
        className="outline-none border border-slate-300 aria-selected:border-slate-500 dark:border-neutral-800 dark:aria-selected:border-neutral-500"
      >
        <button className="flex items-center justify-center w-8 h-8 rounded">
          <span
            className="block w-6 h-6 border rounded-[2px] border-slate-50 dark:border-neutral-950"
            style={{ backgroundColor: `#${color}` }}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={4} align="start" className="z-30">
          <HexColorPicker
            onChange={(e) => onChange(e.substring(1))}
            color={color}
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
