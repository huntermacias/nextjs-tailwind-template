import { Combobox } from "@/components/combobox";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-[#191919]">
      <Sidebar />
      <Combobox />
    </div>
  );
}
