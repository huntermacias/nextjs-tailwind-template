'use client'
import { useState, useEffect, useRef } from "react";
import { Briefcase, ChartSpline, CircleCheckBig, HomeIcon, Inbox, Layers, SearchIcon, SquarePen, UserRoundPlus } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

export default function Home() {
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
    <div className="h-screen bg-[#191919] relative">
      <Sidebar openSearch={openSearch} />

      {isSearchOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#191919] backdrop-blur-sm bg-opacity-70 z-50">
          <div ref={searchModalRef} className="w-[500px] bg-[#191919] border border-[#262626] p-1 rounded-lg shadow-lg">
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Issue">
                  <CommandItem onSelect={closeSearch}>
                    <SquarePen className="w-4 h-4 mr-2" />
                    Create new issue
                    <CommandShortcut><span>⌘</span>C</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                {/* <CommandSeparator /> */}

                <CommandGroup heading="Project">
                  <CommandItem onSelect={closeSearch}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Create new project
                    <CommandShortcut><span>⌘</span>P</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                {/* <CommandSeparator /> */}

                <CommandGroup heading="Cycle">
                  <CommandItem onSelect={closeSearch}>
                    <CircleCheckBig className="w-4 h-4 mr-2" />
                    Create new cycle
                    <CommandShortcut><span>⌘</span>Q</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                {/* <CommandSeparator /> */}

                <CommandGroup heading="Module">
                  <CommandItem onSelect={closeSearch}>
                    <Layers className="w-4 h-4 mr-2" />
                    Create new module
                    <CommandShortcut><span>⌘</span>M</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                {/* <CommandSeparator /> */}

                <CommandGroup heading="View">
                  <CommandItem onSelect={closeSearch}>
                    <Inbox className="w-4 h-4 mr-2" />
                    Create new view
                    <CommandShortcut><span>⌘</span>V</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                {/* <CommandSeparator /> */}

                <CommandGroup heading="Page">
                  <CommandItem onSelect={closeSearch}>
                    <ChartSpline className="w-4 h-4 mr-2" />
                    Create new page
                    <CommandShortcut><span>⌘</span>P</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}

    </div>
  );
}
