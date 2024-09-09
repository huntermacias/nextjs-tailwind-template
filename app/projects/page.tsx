// app/projects/page.tsx

'use client'

import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { BoardContainer } from "@/components/boardContainer";
import { mockColumns } from "@/data/mockData";


const ProjectPage = () => {
  const [columns, setColumns] = useState(mockColumns); // Initially use mock data

  return (
    <div className="bg-[#191919] h-screen w-full p-4 z-50">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Kanban Board */}
      <div className="mt-6">
        <BoardContainer initialColumns={columns} />
      </div>
    </div>
  );
};

export default ProjectPage;
