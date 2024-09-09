'use client';
import { Button } from "./ui/button";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { useState, useEffect, useRef } from "react";
import { Briefcase, ChartSpline, CircleCheckBig, HomeIcon, Inbox, Layers, SearchIcon, SquarePen, UserRoundPlus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "./ui/command";

type Props = {};

const Sidebar = ({ }: Props) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchModalRef = useRef<HTMLDivElement | null>(null);

  function openSearch() {
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
  }

  // Close the search modal when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        closeSearch();
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="w-64 h-screen bg-[#191919] border-r border-[#262626] ">
      <div className="py-3 w-full flex items-center justify-around">
        <Button className="text-[#606060] justify-start items-center h-8 bg-[#191919] w-[200px] border border-[#2e2e2e]">
          <div className="flex items-center justify-center gap-1 text-xs">
            <SquarePen className="w-4 h-4" /> <span>New Issue</span>
          </div>
        </Button>
        <div onClick={openSearch} className="cursor-pointer border border-[#262626] rounded-md h-8 flex items-center px-2 py-1">
          <SearchIcon className="text-[#737373] w-4 h-4" />
        </div>
      </div>

      <ul className="text-[#9f9f9f] px-4 space-y-2 text-xs">
        <li className="hover:bg-[#202020] p-1 rounded-sm flex items-center space-x-2">
          <HomeIcon className="h-4 w-4" /> <span>Home</span>
        </li>
        <li className="hover:bg-[#202020] p-1 rounded-sm flex items-center space-x-2">
          <UserRoundPlus className="h-4 w-4" />
          <Link href="/yourwork">Your Work</Link>
        </li>
        <li className="hover:bg-[#202020] p-1 rounded-sm flex items-center space-x-2">
          <Inbox className="h-4 w-4" /> <span>Inbox</span>
        </li>
      </ul>

      <SidebarItem name="Workspace" />

      <ul className="text-[#9f9f9f] px-4 space-y-2 text-xs">
        <li className="hover:bg-[#202020] p-1 rounded-sm flex items-center space-x-2">
          <Briefcase className="h-4 w-4" /> <span>Projects</span>
        </li>
        <li className="hover:bg-[#202020] p-1 rounded-sm flex items-center space-x-2">
          <Layers className="h-4 w-4" /> <span>Views</span>
        </li>
        <li className="hover:bg-[#202020] p-1 rounded-sm flex justify-between items-center space-x-2">
          <div className="flex items-center justify-around space-x-2">
            <CircleCheckBig className="h-4 w-4" />
            <span>Cycles</span>
          </div>
          <span className="bg-[#212c47] text-[#396ae6] rounded-full flex px-2 py-0.5 text-xs">
            Pro
          </span>
        </li>
        <li className="hover:bg-[#202020] p-1 rounded-sm flex space-x-2">
          <ChartSpline className="h-4 w-4" /> <span>Analytics</span>
        </li>
      </ul>

      <SidebarItem name="Your Favorites" />
      <p className="text-xs text-[#606060] text-center">No favorites yet</p>

      <SidebarItem name="Your Projects" />

      {isSearchOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#191919] backdrop-blur-sm bg-opacity-70 z-50">
          <div ref={searchModalRef} className="w-[500px] bg-[#191919] border border-[#262626] p-4 rounded-lg shadow-lg">
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Issue">
                  <CommandItem onSelect={closeSearch}>
                    <SquarePen className="w-4 h-4 mr-2" />
                    Create new issue
                    <CommandShortcut>⌘C</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Project">
                  <CommandItem onSelect={closeSearch}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Create new project
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Cycle">
                  <CommandItem onSelect={closeSearch}>
                    <CircleCheckBig className="w-4 h-4 mr-2" />
                    Create new cycle
                    <CommandShortcut>⌘Q</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Module">
                  <CommandItem onSelect={closeSearch}>
                    <Layers className="w-4 h-4 mr-2" />
                    Create new module
                    <CommandShortcut>⌘M</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="View">
                  <CommandItem onSelect={closeSearch}>
                    <Inbox className="w-4 h-4 mr-2" />
                    Create new view
                    <CommandShortcut>⌘V</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Page">
                  <CommandItem onSelect={closeSearch}>
                    <ChartSpline className="w-4 h-4 mr-2" />
                    Create new page
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
