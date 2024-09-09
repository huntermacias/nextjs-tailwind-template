// BoardContainer.tsx
import { useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Column, Task } from "@/types";
import { BoardColumn } from "./boardColumn";

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

export function BoardContainer() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleTaskAdd = (columnId: string, newTask: Task) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
      )
    );
  };

  const handleColumnRename = (columnId: string, newTitle: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      )
    );
  };

  const handleColumnDelete = (columnId: string) => {
    setColumns((prevColumns) => prevColumns.filter((column) => column.id !== columnId));
  };

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title: "New Column",
      tasks: [],
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  return (
    <DndContext>
      <div className="flex gap-4">
        <SortableContext items={columns.map((column) => column.id)}>
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

        <Button onClick={handleAddColumn} className="bg-green-600 text-white">
          <Plus /> Add Column
        </Button>
      </div>
    </DndContext>
  );
}
