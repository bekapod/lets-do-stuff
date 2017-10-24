import { Action } from '@ngrx/store';
import { Todo } from '../models';

export const FETCH_TODOS = '[Todos] Fetch';
export const FETCH_TODOS_SUCCEEDED = '[Todos] Fetch: Succeeded';
export const FETCH_TODOS_FAILED = '[Todos] Fetch: Failed';
export const ADD_TODO = '[Todos] Add';
export const ADD_TODO_SUCCEEDED = '[Todos] Add: Succeeded';
export const ADD_TODO_FAILED = '[Todos] Add: Failed';


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

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) {}
}

export class AddTodoSucceeded implements Action {
  readonly type = ADD_TODO_SUCCEEDED;
}

export class AddTodoFailed implements Action {
  readonly type = ADD_TODO_FAILED;

  constructor(public payload: any) {}
}

export type Actions = FetchTodos;
