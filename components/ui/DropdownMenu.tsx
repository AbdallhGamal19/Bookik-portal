import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import SidebarLink from "./SidebarLink";
import { FaSearch } from "react-icons/fa";

export default function DropdownMenu() {
  return (
    <div className="relative ">
      <Menu __demoMode>
        <MenuButton className="w-full text-right">
          <div className="w-full flex items-center justify-between text-theme-text-primary p-3 rounded-bookik-rounded-lg hover:bg-theme-accent-primary/10 transition-colors border border-theme-border-primary">
            <span className="text-base font-medium hover:text-theme-accent-primary w-[75%]">
              text
            </span>
            <span className="text-lg w-1/4 flex justify-center items-center text-theme-text-secondary">
              icon
            </span>
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="absolute left-0 w-full rounded-bookik-rounded-xl border border-theme-border-primary bg-theme-bg-card p-1 text-sm/6 text-theme-text-primary shadow-theme-shadow-lg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-bookik-rounded-lg px-3 py-1.5 data-focus:bg-theme-bg-hover hover:bg-theme-bg-hover transition-colors">
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-theme-text-secondary group-data-focus:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
