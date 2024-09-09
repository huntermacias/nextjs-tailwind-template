// TaskCard.tsx

import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="p-4 bg-[#2e2e2e] rounded-lg text-white">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-400">{task.description}</p>
      {/* Add more detailed task info like tags and due date */}
    </div>
  );
}
