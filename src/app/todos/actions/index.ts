import { Action } from '@ngrx/store';
import { Todo, TodoList } from '../models';

export const FETCH_TODOS = '[Todos] Fetch';
export const FETCH_TODOS_SUCCEEDED = '[Todos] Fetch: Succeeded';
export const ADD_TODO = '[Todos] Add';
export const ADD_TODO_SUCCEEDED = '[Todos] Add: Succeeded';

export class FetchTodos implements Action {
  readonly type = FETCH_TODOS;
}

export class FetchTodosSucceeded implements Action {
  readonly type = FETCH_TODOS_SUCCEEDED;

  constructor(public payload: TodoList) {}
}

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) {}
}

export class AddTodoSucceeded implements Action {
  readonly type = ADD_TODO_SUCCEEDED;
}

export type Actions = FetchTodos | FetchTodosSucceeded | AddTodo | AddTodoSucceeded;
