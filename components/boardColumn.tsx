import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronDown, FilePenIcon, Plus, Trash } from "lucide-react";
import { Column, Task } from "@/types";
import { TaskCard } from "./taskCard";

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
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        columnId: column.id,
        title: newTaskTitle,
        description: "",
        tags: [],
        dueDate: new Date(),
        priority: "medium",
        completed: false,
        assignee: "",
        timeSpent: 0,
        comments: [],
        attachments: [],
      };
      onTaskAdd(column.id, newTask);
      setNewTaskTitle("");
    }
  };

  const handleColumnRename = () => {
    setIsEditingTitle(false);
    onColumnRename(column.id, columnTitle);
  };

  // Task status color and label data
  const statusMap = {
    backlog: { color: "bg-gray-500/30", label: "Backlog" },
    todo: { color: "bg-yellow-500/30", label: "Todo" },
    inProgress: { color: "bg-blue-500/30", label: "In Progress" },
    done: { color: "bg-green-500/30", label: "Done" },
  } as any;

  const { color, label } = statusMap[column.title.toLowerCase()] || statusMap.backlog;

  return (
    <div className="w-full max-w-[450px] h-full flex flex-col bg-[#101010]/80 border border-[#333] rounded-lg shadow-md transition-transform hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#121111]/30 backdrop-blur-lg border-b border-[#333] rounded-t-lg shadow-md">
        {/* Column Title with Status Dot */}
        {isEditingTitle ? (
          <input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleColumnRename}
            className="bg-transparent border-b border-[#333] text-white outline-none transition-colors w-full text-lg p-1"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            {/* Status Dot */}
            <div
              className={`w-3 h-3 rounded-full ${color} sm:w-4 sm:h-4`}
              aria-label={label}
            ></div>
            {/* Status Label - responsive */}
            <span className="hidden sm:block text-xs md:text-sm text-white font-semibold">
              {label}
            </span>
          </div>
        )}

        {/* Edit and Delete Buttons */}
        <div className="flex justify-end w-full sm:w-auto">
          <Button
            variant="ghost"
            className="flex items-center justify-center text-white hover:text-[#00ff99] hover:bg-[#3f3f3f]/30 transition-all rounded-lg px-1.5 py-0.5"
            onClick={() => setIsEditingTitle(true)}
          >
            <FilePenIcon className="w-4 h-4 text-[#adadae]" />
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-center text-red-500 hover:bg-red-600/30 hover:text-white transition-all rounded-lg px-1.5 py-0.5"
            onClick={() => onColumnDelete(column.id)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Scrollable Task List */}
      <div className="flex-grow">
        <ScrollArea>
          <CardContent className="p-2 space-y-4">
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </CardContent>
        </ScrollArea>
      </div>

      {/* Add Task Section */}
      <CardFooter className="border-t border-[#333] bg-[#121111]/80 flex items-center justify-between px-4 py-3">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full bg-[#2e2e2e] text-white p-2 rounded-md h-8 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          placeholder="New task title"
        />
        <Button
          onClick={handleAddTask}
          className="ml-2 h-7 w-12 p-0 bg-green-600/30 hover:bg-green-500 text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </CardFooter>
    </div>
  );
}
