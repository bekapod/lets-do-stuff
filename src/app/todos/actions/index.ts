import { Action } from '@ngrx/store';
import { Todo, TodoList } from '../models';

export const FETCH_TODOS = '[Todos] Fetch';
export const FETCH_TODOS_SUCCEEDED = '[Todos] Succeeded';
export const FETCH_TODOS_FAILED = '[Todos] Failed';

export class FetchTodos implements Action {
  readonly type = FETCH_TODOS;
}

export class FetchTodosSucceeded implements Action {
  readonly type = FETCH_TODOS_SUCCEEDED;

  constructor(public payload: TodoList) {}
}

export class FetchTodosFailed implements Action {
  readonly type = FETCH_TODOS_FAILED;

  constructor(public payload: any) {}
}

export type Actions = FetchTodos;
