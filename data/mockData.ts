// mockData.ts

import { Column, Tag, Task } from "@/types";


export const mockTags: Tag[] = [
  { id: '1', name: 'Urgent', color: 'red' },
  { id: '2', name: 'Feature', color: 'green' },
  { id: '3', name: 'Design', color: 'purple' },
];

export const mockTasks: Task[] = [
  {
    id: 'task1',
    columnId: 'todo',
    title: 'Implement user authentication',
    description: 'Develop user authentication with SSO.',
    tags: [mockTags[0], mockTags[1]],
    dueDate: new Date(),
    priority: 'high',
  },
  {
    id: 'task2',
    columnId: 'in-progress',
    title: 'Design payment UI',
    description: 'Create UI for payment gateway',
    tags: [mockTags[2]],
    dueDate: new Date(),
    priority: 'medium',
  },
];

export const mockColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: mockTasks.filter((task) => task.columnId === 'todo'),
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: mockTasks.filter((task) => task.columnId === 'in-progress'),
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [],
  },
];
