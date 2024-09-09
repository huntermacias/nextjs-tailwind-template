import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./taskCard";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { GripVertical, Plus, Trash, ChevronDown, FileIcon, FilePenIcon } from "lucide-react";
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
      className="w-full max-w-[450px] h-2/3 flex flex-col bg-[#101010]/60 border border-[#2a2a2a] rounded-lg shadow-md transition-transform hover:shadow-lg"
    >
      <CardHeader className="flex flex-row items-center p-4 bg-[#232323]/70 backdrop-blur-lg border-b border-[#2a2a2a] rounded-t-lg shadow-md">

        {/* left side */}
        {isEditingTitle ? (
          <input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleColumnRename}
            className="bg-transparent border-b border-[#5a5a5a] text-white outline-none focus:border-[#00ff99] transition-colors w-full text-lg p-1"
            autoFocus
          />
        ) : (
          <span
            className="text-white text-sm font-semibold cursor-pointer hover:text-[#00ff99] transition-all w-full"
            onClick={() => setIsEditingTitle(true)}
          >
            {column.title}
            <span className="text-xs text-[#bebdbd] ml-2 bg-blue-500/30 rounded-xl px-3 py-0.5"> {column.tasks.length}</span>

            <ChevronDown className="inline-block w-5 h-5 ml-2 text-[#8a8a8a] hover:text-[#00ff99] transition-all" />
          </span>
        )}

        {/* right side */}
        <div className="flex justify-end w-full">
          <Button
            variant="ghost"
            className="flex items-center justify-center text-white hover:text-[#00ff99] bg-[#1f1f1f] hover:bg-[#3f3f3f] transition-all rounded-lg"
            onClick={() => setIsEditingTitle(true)}
          >
            <FilePenIcon className="w-5 h-5 text-[#6862bd]" />
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white p-2 bg-[#1f1f1f] transition-all rounded-lg"
            onClick={() => onColumnDelete(column.id)}
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>

      </CardHeader>


      {/* Scrollable Task List */}
      <div className="">
        <ScrollArea className="">
          <CardContent className="p-2 space-y-4">
            <SortableContext items={column.tasks.map((task) => task.id)}>
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
          </CardContent>
        </ScrollArea>
      </div>

      {/* Add Task Section Fixed at the Bottom */}
      <div className="mt-auto px-4 py-3 border-t border-[#2a2a2a] bg-[#1e1e1e] flex items-center justify-between">
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
