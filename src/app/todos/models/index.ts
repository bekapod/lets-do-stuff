export interface Todo {
  id: string;
  title: string;
  complete: boolean;
  created: string;
}

export interface TodoList {
  [key: string]: Todo;
}
