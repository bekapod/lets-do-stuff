import { Action } from '@ngrx/store';
import { Todo, TodoList } from '../models';

export const FETCH_TODOS = '[Todos] Fetch';
export const FETCH_TODOS_SUCCEEDED = '[Todos] Fetch: Succeeded';
export const ADD_TODO = '[Todos] Add';
export const ADD_TODO_SUCCEEDED = '[Todos] Add: Succeeded';
export const SAVE_TODO = '[Todos] Save';
export const SAVE_TODO_SUCCEEDED = '[Todos] Save: Succeeded';
export const DELETE_TODO = '[Todos] Delete';
export const DELETE_TODO_SUCCEEDED = '[Todos] Delete: Succeeded';
export const SET_CURRENT_TODO = '[Todos] Set Current Todo';

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

export class SaveTodo implements Action {
  readonly type = SAVE_TODO;

  constructor(public payload: Todo) {}
}

export class SaveTodoSucceeded implements Action {
  readonly type = SAVE_TODO_SUCCEEDED;
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: Todo) {}
}

export class DeleteTodoSucceeded implements Action {
  readonly type = DELETE_TODO_SUCCEEDED;
}

export class SetCurrentTodo implements Action {
  readonly type = SET_CURRENT_TODO;

  constructor(public payload: string) {}
}

export type Actions = FetchTodos | FetchTodosSucceeded | AddTodo | AddTodoSucceeded | SaveTodo | SaveTodoSucceeded | SetCurrentTodo;
