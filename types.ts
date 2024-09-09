// types.ts

// Define an expanded TagColor to accommodate more color options
export type TagColor = 'red' | 'orange' | 'rose' | 'purple' | 'green' | 'blue' | 'yellow';

// Tag interface remains the same
export interface Tag {
  id: string;
  name: string;
  color: TagColor;
}

// Comment interface for task comments
export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

// Attachment interface for task file attachments
export interface Attachment {
  id: string;
  name: string;
  url: string;
}

// Priority levels for tasks
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// Task interface with expanded properties
export interface Task {
  id: string;
  columnId: string;            // Reference to the column this task belongs to
  title: string;               // Task title
  description: string;         // Detailed task description
  completed: boolean;          // Task completion status
  priority: TaskPriority;      // Priority level (low, medium, high, urgent)
  dueDate: Date;               // Due date for the task
  assignee: string;            // Person assigned to the task
  timeSpent: number;           // Time spent on the task in hours
  comments: Comment[];         // List of comments related to the task
  attachments: Attachment[];   // List of file attachments for the task
  tags: Tag[];                 // List of tags associated with the task
}

// Column interface
export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// BoardState interface for managing columns
export interface BoardState {
  columns: Column[];
}
