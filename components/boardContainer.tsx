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
  const [columns, setColumns] = useState<Column[]>(initialColumns);  // State for managing columns
  const [activeTask, setActiveTask] = useState<Task | null>(null);    // Track the task being dragged

  // Handle drag start event
  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeColumnId = active.data.current?.columnId;
    const taskId = active.id;

    const activeColumn = columns.find((col) => col.id === activeColumnId);
    if (!activeColumn) return;

    const draggedTask = activeColumn.tasks.find((task) => task.id === taskId);
    setActiveTask(draggedTask || null);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) {
      setActiveTask(null);
      return;
    }

    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    // Only move task if it's dragged to a different column
    if (activeColumnId !== overColumnId) {
      setColumns((columns) => {
        const activeColumn = columns.find((col) => col.id === activeColumnId);
        const overColumn = columns.find((col) => col.id === overColumnId);
        if (!activeColumn || !overColumn) return columns;

        const activeTaskIndex = activeColumn.tasks.findIndex((task) => task.id === active.id);
        const [draggedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);

        // Add task to the new column
        overColumn.tasks.push(draggedTask);
        draggedTask.columnId = overColumnId;

        return [...columns];
      });
    }

    setActiveTask(null); // Reset active task after dropping
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex gap-3 flex-auto min-h-screen">
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        </SortableContext>
      </div>

      {/* Drag Overlay for smoother drag experience */}
      {createPortal(
        <DragOverlay>
          {activeTask ? (
            <div className="w-[350px] p-2 bg-[#2e2e2e] border border-gray-700 rounded-lg shadow-lg">
              {/* Simulate the task card being dragged */}
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
