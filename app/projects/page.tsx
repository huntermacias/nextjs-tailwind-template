// app/projects/page.tsx

'use client'

import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";  // Assuming this exists in your project
import { BoardContainer } from "@/components/boardContainer";
import { mockColumns } from "@/data/mockData";


const ProjectPage = () => {
  const [columns, setColumns] = useState(mockColumns);  // Initially use mock data

  return (
    <div className="bg-[#191919] h-screen w-full p-6 z-50">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Board Section */}
      <div className="mt-6 flex overflow-x-auto ">
        <BoardContainer initialColumns={columns} />
      </div>
    </div>
  );
};

export default ProjectPage;
