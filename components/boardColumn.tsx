// BoardColumn.tsx
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./taskCard";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { GripVertical, Plus, Trash } from "lucide-react";
import { Column, Task } from "@/types";

interface BoardColumnProps {
  column: Column;
  onColumnRename: (columnId: string, newTitle: string) => void;
  onTaskAdd: (columnId: string, task: Task) => void;
  onColumnDelete: (columnId: string) => void;
}

export function BoardColumn({
  column,
  onColumnRename,
  onTaskAdd,
  onColumnDelete,
}: BoardColumnProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        columnId: column.id,
        title: newTaskTitle,
        description: '',
        tags: [],
        dueDate: new Date(),
        priority: 'medium',
      };
      onTaskAdd(column.id, newTask);
      setNewTaskTitle('');
    }
  };

  const handleColumnRename = () => {
    setIsEditingTitle(false);
    onColumnRename(column.id, columnTitle);
  };

  return (
    <Card ref={setNodeRef} style={style} className="w-[350px] bg-[#1e1e1e] flex flex-col">
      <CardHeader className="p-4 border-b flex items-center justify-between">
        {isEditingTitle ? (
          <input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleColumnRename}
            className="bg-transparent border-b border-gray-500 text-white"
          />
        ) : (
          <span className="text-white font-semibold">{column.title}</span>
        )}

        <div className="flex space-x-2">
          <Button onClick={() => setIsEditingTitle(true)} variant="ghost" className="text-primary/50">
            <GripVertical />
          </Button>
          <Button onClick={() => onColumnDelete(column.id)} variant="ghost" className="text-red-600">
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea>
        <CardContent className="p-2 flex-grow">
          <SortableContext items={column.tasks.map((task) => task.id)}>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>

          {/* Add Task Section */}
          <div className="flex items-center mt-4">
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-[#2e2e2e] text-white p-2 rounded"
              placeholder="New task title"
            />
            <Button onClick={handleAddTask} className="ml-2">
              <Plus />
            </Button>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
