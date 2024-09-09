// types.ts

export type TagColor = 'red' | 'orange' | 'rose' | 'purple' | 'green';

export interface Tag {
  id: string;
  name: string;
  color: TagColor;
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  tags: Tag[];
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface BoardState {
  columns: Column[];
}
