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

  // Function to find and return column and task by ID
  const getColumnAndTask = (columnId: string, taskId: string) => {
    const column = columns.find((col) => col.id === columnId);
    const task = column?.tasks.find((task) => task.id === taskId);
    return { column, task };
  };

  // Handle drag start event
  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeColumnId = active.data.current?.columnId;
    const taskId = active.id;

    const { task } = getColumnAndTask(activeColumnId, taskId);
    if (task) setActiveTask(task);
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

    if (activeColumnId !== overColumnId) {
      moveTaskBetweenColumns(active.id, activeColumnId, overColumnId);
    }

    setActiveTask(null); // Reset active task after dragging
  };

  // Function to move a task between two columns
  const moveTaskBetweenColumns = (taskId: string, fromColumnId: string, toColumnId: string) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const fromColumn = updatedColumns.find((col) => col.id === fromColumnId);
      const toColumn = updatedColumns.find((col) => col.id === toColumnId);

      if (!fromColumn || !toColumn) return prevColumns;

      // Find and remove task from the original column
      const taskIndex = fromColumn.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return prevColumns;

      const [movedTask] = fromColumn.tasks.splice(taskIndex, 1);

      // Add task to the new column
      movedTask.columnId = toColumnId;
      toColumn.tasks.push(movedTask);

      return updatedColumns;
    });
  };

  // Handle column renaming (can be used later)
  const handleColumnRename = (columnId: string, newTitle: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );
  };

  // Handle task addition (can be passed to children components)
  const handleTaskAdd = (columnId: string, task: Task) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  // Handle column deletion (can be passed to children components)
  const handleColumnDelete = (columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col.id !== columnId)
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex gap-3 flex-auto min-h-screen">
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onColumnRename={handleColumnRename}
              onTaskAdd={handleTaskAdd}
              onColumnDelete={handleColumnDelete}
            />
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
