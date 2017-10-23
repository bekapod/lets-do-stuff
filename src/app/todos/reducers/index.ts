import { Todo } from '../models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [
    { id: '1', title: 'Todo Item 1', complete: false },
    { id: '2', title: 'Todo Item 2', complete: true },
    { id: '3', title: 'Todo Item 3', complete: false },
  ]
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    default:
      return state;
  }
}

export const getTodosState = createFeatureSelector<State>('todos');

export const getTodos = createSelector(
  getTodosState,
  state => state.todos
);
