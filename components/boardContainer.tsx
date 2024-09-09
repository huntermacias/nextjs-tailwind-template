// components/BoardContainer.tsx

import { useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { Column, Task } from "@/types";
import { createPortal } from "react-dom";
import { BoardColumn } from "./boardColumn";

interface BoardContainerProps {
  initialColumns: Column[];
}

export function BoardContainer({ initialColumns }: BoardContainerProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeColumnId = active.data.current?.columnId;
    const taskId = active.id;

    const activeColumn = columns.find((col) => col.id === activeColumnId);
    if (!activeColumn) return;

    const draggedTask = activeColumn.tasks.find((task) => task.id === taskId);
    setActiveTask(draggedTask || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) {
      setActiveTask(null);
      return;
    }

    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    if (activeColumnId !== overColumnId) {
      setColumns((columns) => {
        const activeColumn = columns.find((col) => col.id === activeColumnId);
        const overColumn = columns.find((col) => col.id === overColumnId);
        if (!activeColumn || !overColumn) return columns;

        const activeTaskIndex = activeColumn.tasks.findIndex((task) => task.id === active.id);
        const [draggedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);

        overColumn.tasks.push(draggedTask);
        draggedTask.columnId = overColumnId;

        return [...columns];
      });
    }

    setActiveTask(null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex gap-4 overflow-x-auto h-[calc(100vh-120px)] pb-4">
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>
          {activeTask ? (
            <div className="w-[350px] p-2 bg-[#2e2e2e] border border-gray-700 rounded-lg shadow-lg">
              <h3 className="text-white font-semibold">{activeTask.title}</h3>
              <p className="text-gray-400 text-sm">{activeTask.description}</p>
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
