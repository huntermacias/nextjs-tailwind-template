// components/TaskCard.tsx

import { Tag, Task } from "@/types";
import { useState } from "react";
import { CalendarIcon, UserIcon, TagIcon, CheckCircleIcon } from "lucide-react";
import TagCreator from "./global/tagCreator";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [tags, setTags] = useState(task.tags);

  const handleTagUpdate = (newTags: Tag[]) => {
    setTags(newTags);  // Update tags dynamically
  };

  return (
    <div className="p-3 bg-[#2e2e2e] border border-[#3a3a3a] rounded-md shadow-sm hover:shadow-lg transition-all">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-white font-medium text-sm">{task.title}</h3>
        <div className="flex space-x-2">
          <CheckCircleIcon className="text-green-500 w-4 h-4" />
        </div>
      </div>

      <div className="text-gray-400 text-xs space-y-1">
        <div className="flex items-center space-x-1">
          <TagIcon className="w-3 h-3 text-gray-500" />
          <span>Priority: {task.priority}</span>
        </div>
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-3 h-3 text-gray-500" />
          <span>Due: {task.dueDate.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <UserIcon className="w-3 h-3 text-gray-500" />
          <span>Assigned to: {task.assignee}</span>
        </div>
      </div>

      {/* Tags Section */}
      <div className="p-4 bg-[#191919]/40 backdrop-blur-sm border border-[#191919]/60 rounded-lg mt-3">
      <h3 className="text-white font-semibold">Manage Task Tags</h3>
      <TagCreator getSelectedTags={setTags} defaultTags={tags} />
    </div>    </div>
  );
}
