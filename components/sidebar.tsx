import { Briefcase, ChartSpline, CircleCheckBig, HomeIcon, Inbox, Layers, SearchIcon, SquarePen, UserRoundPlus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";

type Props = {
  openSearch: () => void;
};

const Sidebar = ({ openSearch }: Props) => {
  return (
    <div className="w-64 h-screen bg-[#191919] border-r border-[#262626]">
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
    </div>
  );
};

export default Sidebar;
