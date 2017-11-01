import { Action } from '@ngrx/store';
import { Todo, TodoList } from '../models';

export const FETCH_TODOS = '[Todos] Fetch';
export const FETCH_TODOS_SUCCEEDED = '[Todos] Fetch: Succeeded';
export const FETCH_TODOS_FAILED = '[Todos] Fetch: Failed';
export const ADD_TODO = '[Todos] Add';
export const ADD_TODO_SUCCEEDED = '[Todos] Add: Succeeded';
export const ADD_TODO_FAILED = '[Todos] Add: Failed';
export const SAVE_TODO = '[Todos] Save';
export const SAVE_TODO_SUCCEEDED = '[Todos] Save: Succeeded';
export const SAVE_TODO_FAILED = '[Todos] Save: Failed';
export const DELETE_TODO = '[Todos] Delete';
export const DELETE_TODO_SUCCEEDED = '[Todos] Delete: Succeeded';
export const DELETE_TODO_FAILED = '[Todos] Delete: Failed';
export const SET_CURRENT_TODO = '[Todos] Set Current Todo';

export class FetchTodos implements Action {
  readonly type = FETCH_TODOS;
}

export class FetchTodosSucceeded implements Action {
  readonly type = FETCH_TODOS_SUCCEEDED;

  constructor(public payload: TodoList) {}
}

export class FetchTodosFailed implements Action {
  readonly type = FETCH_TODOS_FAILED;
}

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) {}
}

export class AddTodoSucceeded implements Action {
  readonly type = ADD_TODO_SUCCEEDED;
}

export class AddTodoFailed implements Action {
  readonly type = ADD_TODO_FAILED;
}

export class SaveTodo implements Action {
  readonly type = SAVE_TODO;

  constructor(public payload: Todo) {}
}

export class SaveTodoSucceeded implements Action {
  readonly type = SAVE_TODO_SUCCEEDED;
}

export class SaveTodoFailed implements Action {
  readonly type = SAVE_TODO_FAILED;
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: Todo) {}
}

export class DeleteTodoSucceeded implements Action {
  readonly type = DELETE_TODO_SUCCEEDED;
}

export class DeleteTodoFailed implements Action {
  readonly type = DELETE_TODO_FAILED;
}

export class SetCurrentTodo implements Action {
  readonly type = SET_CURRENT_TODO;

  constructor(public payload: string) {}
}

export type Actions = FetchTodos | FetchTodosSucceeded | FetchTodosFailed | AddTodo | AddTodoSucceeded | AddTodoFailed | SaveTodo | SaveTodoSucceeded | SaveTodoFailed | DeleteTodo | DeleteTodoSucceeded | DeleteTodoFailed | SetCurrentTodo;
