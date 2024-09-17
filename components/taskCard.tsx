import { Tag, Task } from "@/types";
import { useState } from "react";
import { CalendarIcon, UserIcon, TagIcon, CheckCircleIcon } from "lucide-react";
import TagCreator from "./global/tagCreator2";

// Define the props for TaskCard
interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [tags, setTags] = useState<Tag[]>(task.tags || []);

  // Function to handle tag updates from TagCreator
  const handleTagUpdate = (newTags: Tag[]): void => {
    setTags(newTags);  // Update the tags state dynamically when changes occur
  };

  return (
    <div className="p-4 bg-[#1f1f1f] rounded-md shadow-md hover:shadow-lg transition-all">
      {/* Task Title and Completion Status */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm sm:text-base">{task.title}</h3>
        <CheckCircleIcon className="text-green-500 w-5 h-5" />
      </div>

      {/* Task Details (Priority, Due Date, Assignee) */}
      <div className="text-gray-400 text-sm space-y-2">
        <div className="flex items-center space-x-2">
          <TagIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">Priority: {task.priority}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">Assigned to: {task.assignee || "Unassigned"}</span>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mt-4 p-4 bg-[#191919]/20 backdrop-blur border border-[#333]/60 rounded-lg">
        <h4 className="text-white font-semibold mb-2">Manage Task Tags</h4>
        <TagCreator defaultTags={tags} getSelectedTags={handleTagUpdate} />
      </div>
    </div>
  );
}
