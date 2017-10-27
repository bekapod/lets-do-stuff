import { Action } from '@ngrx/store';
import { Messages } from '../reducers/messages';

export const ADD_SUCCESS = '[Messages] Add: Success';
export const ADD_ERROR = '[Messages] Add: Error';
export const DELETE_SUCCESS = '[Messages] Delete: Success';
export const DELETE_ERROR = '[Messages] Delete: Error';

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class AddError implements Action {
  readonly type = ADD_ERROR;

  constructor(public payload: any) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: Messages) {}
}

export class DeleteError implements Action {
  readonly type = DELETE_ERROR;

  constructor(public payload: Messages) {}
}

export type Actions = AddSuccess | AddError;
