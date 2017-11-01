export interface Todo {
  id: string;
  title: string;
  complete: boolean;
  created: string;
  description?: string;
  dueDate?: string;
}

export interface TodoList {
  [key: string]: Todo;
}
