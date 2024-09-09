import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./taskCard";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { GripVertical, Plus, Trash, ChevronDown } from "lucide-react";
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
        completed: false,
        assignee: "",
        timeSpent: 0,
        comments: [],
        attachments: []
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
    <div
      ref={setNodeRef}
      style={style}
      className="w-full max-w-[450px] flex flex-col bg-[#1b1b1b] border border-[#2a2a2a] rounded-lg shadow-md transition-transform hover:shadow-lg">

      {/* Column Header */}
      <CardHeader className="p-3 flex items-center justify-between bg-[#1e1e1e] border-b border-[#2a2a2a] rounded-t-lg">
        {isEditingTitle ? (
          <input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleColumnRename}
            className="bg-transparent border-b border-gray-500 text-white outline-none focus:border-green-500 transition-colors"
            autoFocus
          />
        ) : (
          <span
            className="text-white font-semibold hover:text-green-400 transition-colors cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {column.title} <ChevronDown className="inline-block w-4 h-4 ml-1 text-gray-400" />
          </span>
        )}

        <div className="flex space-x-2">
          <Button variant="ghost" className="text-white hover:text-green-500 p-1" onClick={() => setIsEditingTitle(true)}>
            <GripVertical />
          </Button>
          <Button variant="ghost" className="text-red-600 hover:bg-red-700 hover:text-white transition-colors p-1" onClick={() => onColumnDelete(column.id)}>
            <Trash />
          </Button>
          <Button variant="ghost" className="text-green-600 hover:text-green-500 transition-all p-1" onClick={handleAddTask}>
            <Plus />
          </Button>
        </div>
      </CardHeader>

      {/* Scrollable Task List */}
      <ScrollArea className="overflow-auto max-h-[450px]">
        <CardContent className="p-2 space-y-4">
          <SortableContext items={column.tasks.map((task) => task.id)}>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>

      {/* Add Task Section */}
      <div className="px-4 py-3 border-t border-[#2a2a2a] bg-[#1e1e1e] flex items-center justify-between">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full bg-[#2e2e2e] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          placeholder="New task title"
        />
        <Button onClick={handleAddTask} className="ml-2 bg-green-600 hover:bg-green-500 text-white transition-colors">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
