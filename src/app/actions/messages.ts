import { Action } from '@ngrx/store';

export const ADD_SUCCESS = '[Messages] Add: Success';
export const ADD_ERROR = '[Messages] Add: Error';

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class AddError implements Action {
  readonly type = ADD_ERROR;

  constructor(public payload: any) {}
}

export type Actions = AddSuccess | AddError;
