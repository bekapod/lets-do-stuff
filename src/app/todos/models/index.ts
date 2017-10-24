export interface Todo {
  title: string;
  complete: boolean;
  created: string;
}

export interface TodoList {
  [key: string]: Todo;
}
