export interface Todo {
  id: string;
  title: string;
  complete: boolean;
  created: string;
  order: number;
  description?: string;
  dueDate?: string;
}

export interface TodoList {
  [key: string]: Todo;
}
